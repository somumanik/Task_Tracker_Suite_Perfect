import PagePlaceholder from '@/components/PagePlaceholder';
import ThemeSelector from '@/components/theme/ThemeSelector';

/**
 * Settings — Phase 1 mein sirf Appearance (theme) section live hai.
 * Baaki sections (shifts, geofence, notifications...) Phase 4 mein.
 */
export default function SettingsPage() {
  return (
    <PagePlaceholder
      title="Settings"
      description="Organisation settings — shifts, geofence, notification channels and preferences."
      phase="Phase 4"
    >
      <section className="space-y-4" aria-labelledby="appearance-heading">
        <div>
          <h2 id="appearance-heading" className="text-sm font-semibold text-text">
            Appearance
          </h2>
          <p className="mt-1 text-sm text-muted">
            Theme choose karo — turant lagu hoti hai aur preference browser
            mein save rehti hai (refresh ke baad bhi).
          </p>
        </div>
        {/* 6 themes — koi duplicate component nahi, sirf CSS variables */}
        <ThemeSelector />
      </section>
    </PagePlaceholder>
  );
}
