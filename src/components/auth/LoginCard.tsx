@@
-import { useRouter } from "next/navigation";
+import { useRouter } from "next/navigation";
+import { DEMO_ENABLED, DEMO_USERS, PASS_POLICY, setDemoSession } from "@/lib/demoAuth";
@@
   async function onSubmit(e: React.FormEvent) {
     e.preventDefault();
-    
+    const email = identifier.trim().toLowerCase();
+    const pwd = password;
+
+    // 0) Demo-bypass (only when NEXT_PUBLIC_DEMO_LOGIN=true)
+    if (DEMO_ENABLED && DEMO_USERS[email]) {
+      if (!PASS_POLICY.test(pwd)) {
+        setShowPasswordError(true);
+        toast({
+          variant: "destructive",
+          title: "Invalid password",
+          description: "Please meet all password requirements",
+        });
+        return;
+      }
+      const { role } = DEMO_USERS[email];
+      // persist session same as real flow
+      document.cookie = `role=${role}; path=/; max-age=${60 * 60 * 24 * 7};`;
+      setSession({ userId: "demo", email, role });
+      router.replace(role === "admin" ? "/admin" : "/buyer");
+      return; // stop here; no network call in demo mode
+    }
+
     if (!isValid) {
       setShowPasswordError(true);
       toast({ 
         variant: "destructive", 
         title: "Invalid password", 
         description: "Please meet all password requirements" 
       });
       return;
     }
 
     setLoading(true);
 
     try {
-      const data = await api<LoginResp>("/auth/login", {
+      // NOTE: if your backend expects {email, password} (not {identifier}),
+      //       switch the payload to { email, password: pwd }.
+      const data = await api<LoginResp>("/auth/login", {
         method: "POST",
-        body: JSON.stringify({ identifier, password }),
+        body: JSON.stringify({ identifier: email, password: pwd }),
       });
       // simple helper cookie so middleware can redirect
       document.cookie = `role=${data.role}; path=/; max-age=${60 * 60 * 24 * 7};`;
-      setSession({ userId: data.userId, email: data.email, role: data.role });
+      setSession({ userId: data.userId, email: data.email, role: data.role });
       router.replace(data.role === "admin" ? "/admin" : "/buyer");
     } catch (err: any) {
       toast({ variant: "destructive", title: "Login failed", description: err?.message || "Try again." });
     } finally {
       setLoading(false);
     }
   }
@@
-        <Button type="submit" disabled={loading} className="mt-2 w-full bg-black hover:bg-black">
+        <Button type="submit" disabled={loading} className="mt-2 w-full bg-black hover:bg-black">
           <span className="flex items-center justify-center gap-2">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
               <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth="2"/>
               <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" strokeLinecap="round"/>
             </svg>
-            {!loading ? "Send OTP" : "Please wait…"}
+            {!loading ? "Sign in" : "Please wait…"}
           </span>
         </Button>
