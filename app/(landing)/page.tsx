import { LandingHero } from "@/components/LandHero";
import { LandNavBar } from "@/components/LandNavBar";
import { LandingContent } from "@/components/LandingContent";

export default function page() {
  return (
    <div className="h-full">
      <LandNavBar />
      <LandingHero />
      <LandingContent />
    </div>
  )
}
