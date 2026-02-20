import { createClient } from "@/lib/supabase/server"
import { ApplicationForm } from "@/components/application-form"
import { AuthView } from "@/components/auth-view"
import { ShieldCheck } from "lucide-react"

export default async function ApplyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="bg-[#F8F8F6] min-h-screen text-zinc-900 antialiased pt-32 pb-36 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              Official Registry Application
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {user ? "Submit your Startup" : "Join the Ecosystem"}
          </h1>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            {user 
              ? "Complete the details below to list your startup on the Upforge public ledger." 
              : "Verify your identity as a founder to begin the application process."}
          </p>
        </div>

        {/* Dynamic View: Auth or Form */}
        <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          {user ? (
            <ApplicationForm userEmail={user.email!} userId={user.id} />
          ) : (
            <AuthView />
          )}
        </div>

        {/* Security Note */}
        <p className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-zinc-400">
          Secure Founder Authentication · Powered by Supabase
        </p>
      </div>
    </div>
  )
}
