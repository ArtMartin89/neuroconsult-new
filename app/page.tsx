import { HeroBlock } from '@/components/sections/HeroBlock'
import { PainPointsSection } from '@/components/sections/PainPointsSection'
import { CVPSection } from '@/components/sections/CVPSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ConversionFormSection } from '@/components/sections/ConversionFormSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroBlock />
      <PainPointsSection />
      <CVPSection />
      <TimelineSection />
      <ExpertiseSection />
      <CaseStudySection />
      <FAQSection />
      <ConversionFormSection />
    </main>
  )
}

