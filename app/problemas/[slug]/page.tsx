import { notFound } from 'next/navigation';
import Link from 'next/link';
import { icps, industries, solutions, caseApplications, caseSuccesses } from '@/data/content';

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 7l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 2v7M8 12v.5" strokeLinecap="round" />
      <circle cx="8" cy="8" r="6.5" />
    </svg>
  );
}

export function generateStaticParams() {
  return icps.map((icp) => ({ slug: icp.slug }));
}

export default async function ICPPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const icp = icps.find((i) => i.slug === slug);

  if (!icp) notFound();

  const relatedCases = caseApplications.filter((c) => c.icpSlug === icp.slug);
  const relatedSuccess = caseSuccesses.filter((c) => c.icpSlug === icp.slug).slice(0, 3);
  const relatedIndustries = industries.filter((ind) => icp.industrySlugList.includes(ind.slug));
  const relatedSolutions = solutions.filter((s) => icp.solutionSlugList.includes(s.slug));

  return (
    <>
      {/* Hero */}
      <section className="bg-surface-base pt-28 pb-20 border-b border-border-subtle">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="text-xs text-ink-300 hover:text-brand transition-colors">Inicio</Link>
              <span className="text-ink-300 text-xs">/</span>
              <span className="text-xs text-ink-300">Problemas</span>
              <span className="text-ink-300 text-xs">/</span>
              <span className="text-xs text-brand">{icp.title}</span>
            </div>

            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-5">Problema</p>
            <h1 className="mb-5">{icp.headline}</h1>
            <p className="text-[17px] text-ink-500 leading-relaxed mb-8 max-w-2xl">
              {icp.heroSubheadline}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/sesion"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
              >
                Solicitar diagnóstico <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* El problema real */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El problema real</p>
              <h2 className="mb-6">{icp.problemTitle}</h2>
              <div className="space-y-4">
                {icp.problemText.map((p, i) => (
                  <p key={i} className="text-[17px] text-ink-500 leading-relaxed">{p}</p>
                ))}
              </div>
            </div>

            <div className="p-6 bg-surface-raised border border-border-subtle rounded-card">
              <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-4">Síntomas comunes</p>
              <ul className="space-y-3">
                {icp.symptoms.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
                      <AlertIcon />
                    </span>
                    <span className="text-sm text-ink-500 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Impacto</p>
          <h2 className="mb-4">{icp.impactTitle}</h2>
          {icp.impactText && (
            <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">{icp.impactText}</p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {icp.impactGroups.map((group) => (
              <div key={group.category} className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">{group.category}</p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-500 leading-relaxed">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto en control interno — solo cumplimiento */}
      {'auditSection' in icp && icp.auditSection && (
        <section className="bg-surface-base py-20 border-t border-border-subtle">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Control interno</p>
              <h2 className="mb-6">{icp.auditSection.title}</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-6">{icp.auditSection.text}</p>
              <ul className="space-y-3 mb-6">
                {icp.auditSection.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-[17px] text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[17px] text-ink-500 leading-relaxed border-l-2 border-brand/30 pl-4">
                {icp.auditSection.footer}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* El problema de fondo — solo automatización */}
      {'consistencySection' in icp && icp.consistencySection && (
        <section className="bg-surface-base py-20 border-t border-border-subtle">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">El problema de fondo</p>
                <h2 className="mb-6">{icp.consistencySection.title}</h2>
                <p className="text-[17px] text-ink-500 leading-relaxed mb-2">{icp.consistencySection.text}</p>
                <p className="text-[17px] text-ink-500 leading-relaxed mb-6">{icp.consistencySection.intro}</p>
              </div>
              <div className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <ul className="space-y-4 mb-6">
                  {icp.consistencySection.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      </span>
                      <span className="text-sm font-medium text-ink-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-ink-500 leading-relaxed border-l-2 border-brand/30 pl-4">
                  {icp.consistencySection.footer}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Disponibilidad vs utilización — solo disponibilidad */}
      {'availabilitySection' in icp && icp.availabilitySection && (
        <section className="bg-surface-base py-20 border-t border-border-subtle">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Disponibilidad real</p>
                <h2 className="mb-6">{icp.availabilitySection.title}</h2>
                <p className="text-[17px] text-ink-500 leading-relaxed mb-6">{icp.availabilitySection.text}</p>
              </div>
              <div className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-sm text-ink-500 leading-relaxed mb-5">{icp.availabilitySection.intro}</p>
                <ul className="space-y-4">
                  {icp.availabilitySection.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      </span>
                      <span className="text-sm font-medium text-ink-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Impacto en control y gobernanza — solo control */}
      {'governanceSection' in icp && icp.governanceSection && (
        <section className="bg-surface-base py-20 border-t border-border-subtle">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Control y gobernanza</p>
              <h2 className="mb-6">{icp.governanceSection.title}</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-6">{icp.governanceSection.text}</p>
              <ul className="space-y-3 mb-6">
                {icp.governanceSection.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-[17px] text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[17px] text-ink-500 leading-relaxed border-l-2 border-brand/30 pl-4">
                {icp.governanceSection.footer}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Impacto en estados financieros — solo conciliación */}
      {'financialSection' in icp && icp.financialSection && (
        <section className="bg-surface-base py-20 border-t border-border-subtle">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Control financiero</p>
              <h2 className="mb-6">{icp.financialSection.title}</h2>
              <p className="text-[17px] text-ink-500 leading-relaxed mb-6">{icp.financialSection.text}</p>
              <ul className="space-y-3 mb-6">
                {icp.financialSection.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="text-[17px] text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[17px] text-ink-500 leading-relaxed border-l-2 border-brand/30 pl-4">
                {icp.financialSection.footer}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Cómo se vive por perfil */}
      <section className="bg-surface-alt py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Por área</p>
          <h2 className="mb-10">Este problema se ve distinto en cada área, pero afecta a toda la empresa</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {icp.profiles.map((profile) => (
              <div key={profile.role} className="p-5 bg-surface-raised border border-border-subtle rounded-card">
                <p className="text-xs font-medium text-brand mb-3">{profile.role}</p>
                <p className="text-sm text-ink-500 leading-relaxed italic">&ldquo;{profile.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrias */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Sectores</p>
          <h2 className="mb-4">Este problema es transversal, pero cambia según la operación</h2>
          <p className="text-[17px] text-ink-500 mb-8 max-w-2xl">
            La desconexión se presenta en distintas industrias, aunque con matices diferentes según la operación.
          </p>

          <div className="flex flex-wrap gap-3">
            {relatedIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industrias/${ind.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-border-subtle bg-surface-raised rounded-btn text-sm text-ink-700 hover:border-brand/40 hover:text-brand transition-colors"
              >
                {ind.title} <ArrowRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de aplicación */}
      {relatedCases.length > 0 && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Casos de aplicación</p>
            <h2 className="mb-4">Así se manifiesta en la operación</h2>
            <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">
              La falta de control se traduce en escenarios concretos que afectan directamente la operación.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {relatedCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/casos-aplicacion/${c.slug}`}
                  className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                >
                  <h3 className="text-base font-medium text-ink mb-2">{c.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-3">{c.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                    Ver caso <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cómo lo resuelve HTK */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Cómo lo resolvemos</p>
          <h2 className="mb-4">{icp.solutionTitle}</h2>
          <p className="text-[17px] text-ink-500 mb-10 max-w-2xl">{icp.solutionText}</p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Capacidades */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-5">Capacidades</p>
              <ul className="space-y-3">
                {icp.capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                      <CheckIcon />
                    </span>
                    <span className="text-sm text-ink-700">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soluciones relacionadas */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-ink-300 mb-5">Soluciones relacionadas</p>
              <div className="space-y-4">
                {relatedSolutions.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/soluciones/${s.slug}`}
                    className="group flex items-start gap-4 p-4 border border-border-subtle rounded-card bg-surface-raised hover:border-brand/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-ink mb-1">{s.title}</h3>
                      <p className="text-sm text-ink-300 leading-relaxed">{s.tagline}</p>
                    </div>
                    <span className="mt-1 text-brand group-hover:translate-x-1 transition-transform">
                      <ArrowRight />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de éxito */}
      {('icpSuccessCards' in icp && icp.icpSuccessCards ? icp.icpSuccessCards.length > 0 : relatedSuccess.length > 0) && (
        <section className="bg-surface-alt py-20">
          <div className="max-w-8xl mx-auto px-6 md:px-10">
            <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Evidencia</p>
            <h2 className="mb-10">Empresas que pasaron de incertidumbre a control</h2>
            {'icpSuccessCards' in icp && icp.icpSuccessCards ? (
              <div className="grid md:grid-cols-3 gap-5">
                {icp.icpSuccessCards.map((card) => (
                  <div key={card.client} className="p-6 bg-surface-raised border border-border-subtle rounded-card">
                    <div className="text-3xl font-medium text-brand mb-1">{card.metric}</div>
                    <div className="text-xs font-medium text-ink-300 mb-3">{card.metricLabel}</div>
                    <p className="text-sm font-medium text-ink">{card.client}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-5">
                {relatedSuccess.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={`/casos-exito/${cs.slug}`}
                    className="group p-6 bg-surface-raised border border-border-subtle rounded-card hover:border-brand/30 hover:shadow-sm transition-all"
                  >
                    <div className="text-3xl font-medium text-brand mb-1">{cs.metric}</div>
                    <div className="text-xs font-medium text-ink-300 mb-3">{cs.metricLabel}</div>
                    <p className="text-sm font-medium text-ink mb-1">{cs.client}</p>
                    <p className="text-sm text-ink-300 mb-4 leading-relaxed">{cs.result}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand group-hover:gap-3 transition-all">
                      Ver caso de éxito <ArrowRight />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Recursos */}
      <section className="bg-surface-base py-20">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Recursos</p>
          <h2 className="mb-4">Evalúa si este problema ya está presente en tu operación</h2>
          <p className="text-[17px] text-ink-500 mb-8 max-w-2xl">
            Herramientas gratuitas para identificar el nivel de riesgo en tu empresa.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/recursos/calculadora-roi-activos"
              className="inline-flex items-center gap-2 px-5 py-3 border border-border-subtle bg-surface-raised rounded-btn text-sm text-ink-700 hover:border-brand/40 hover:text-brand transition-colors"
            >
              Calculadora de pérdidas por falta de control <ArrowRight size={12} />
            </Link>
            <Link
              href="/recursos/checklist-control-activos"
              className="inline-flex items-center gap-2 px-5 py-3 border border-border-subtle bg-surface-raised rounded-btn text-sm text-ink-700 hover:border-brand/40 hover:text-brand transition-colors"
            >
              Checklist de control de activos <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-surface-dark py-24 relative overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 md:px-10 text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-brand mb-4">Siguiente paso</p>
          <h2 className="text-white mb-4">{icp.ctaHeadline}</h2>
          <p className="text-[17px] text-white/60 max-w-xl mx-auto mb-8">
            {icp.ctaSubtext}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/sesion"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand text-surface-dark text-sm font-medium rounded-btn hover:bg-brand-hover transition-colors"
            >
              Solicitar diagnóstico gratuito <ArrowRight />
            </Link>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white text-sm font-medium rounded-btn hover:bg-white/10 transition-colors"
            >
              Conocer HTK
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
