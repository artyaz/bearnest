import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const SignOut = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    return(
        <div class='bg-white rounded-lg border border-zync-100 p-10 m-10 space-y-5 flex flex-col justify-center items-center'>
    <Label>You are now logged out. Back to the home page?</Label>
    <a href="../">
        <Button variant='outline'>Redirect</Button>
    </a>
</div>

    )
};



export default SignOut;