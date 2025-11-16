import FloatingEmojis from "@/components/FloatingEmojis";
import CursorHearts from "@/components/CursorHearts";
import Hero from "@/components/Hero";
import MemoriesGallery from "@/components/MemoriesGallery";
import MoodUplifter from "@/components/MoodUplifter";
import ReasonsList from "@/components/ReasonsList";
import Footer from "@/components/Footer";
import { MEMORIES } from "@/lib/constants";
import SecretHeart from "@/components/SecretHeart";
import MobileHint from "@/components/MobileHint";
import PopHearts from "@/components/PopHearts";
import ThisOrThat from "@/components/ThisOrThat";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function Page() {
  return (
    <main className="relative">
      {/* Background floating emojis */}
      <FloatingEmojis />
      {/* Cute cursor heart trail */}
      <CursorHearts />
      {/* Secret heart trigger + background music */}
      <SecretHeart />
      {/* Floating play/pause for background music */}
      <BackgroundMusic />
      {/* Mobile hint to use a laptop */}
      <MobileHint />

      {/* Content */}
      <Hero />
      <MemoriesGallery memories={MEMORIES} />
      <MoodUplifter />
      <ReasonsList />
      <PopHearts />
      <ThisOrThat />
      <Footer />
    </main>
  );
}


