"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "../members.module.css";
import Link from "next/link";

function VerifyPageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<"checking"|"ok"|"fail">("checking");
  const token = params.get("token");

  useEffect(() => {
    async function run() {
      if (!token) return setState("fail");
      try {
        const res = await fetch("/api/auth/telegram/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        });
        const data = await res.json();
        if (data?.ok) {
          setState("ok");
          setTimeout(() => router.replace("/members/xxx"), 600);
        } else setState("fail");
      } catch {
        setState("fail");
      }
    }
    run();
  }, [token, router]);

  return (
    <main className={styles.verify}>
      {state === "checking" && <p>Verifying you with Telegram…</p>}
      {state === "ok" && <p>Verified. Opening the XXX Room…</p>}
      {state === "fail" && (
        <div className={styles.fail}>
          <h1>Almost in.</h1>
          <p>That link expired or wasn’t valid.</p>
          <div className={styles.ctas}>
            <Link className={styles.btnPrimary} href="/api/auth/telegram/start">RETRY</Link>
            <Link className={styles.btnGhost} href="/members">BACK TO MEMBERS</Link>
            <Link className={styles.btnGhost} href="/community">CONTACT MODS</Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyPageInner />
    </Suspense>
  );
}
