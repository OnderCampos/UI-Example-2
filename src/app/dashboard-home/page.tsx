export default function DashboardHomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <p className="text-sm font-medium text-muted-foreground">dashboard-home</p>
          <h1 className="mt-2 text-3xl font-semibold">Populated dashboard view is pending implementation.</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This route preserves the classified view path so the finalized populated-default dashboard can be attached without replacing other views.
          </p>
        </div>
      </div>
    </main>
  );
}
