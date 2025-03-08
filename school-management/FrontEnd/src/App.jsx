import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import StudentContext from "./context/StudentContext";
import { ThemeProvider } from "./components/theme-provider";
import { ParentContext } from "./context/parentContext";
import { Toaster } from "@/components/ui/sonner"

export default function App() {


    return (
        <>
            <ParentContext>
                <StudentContext>
                    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </StudentContext>
            </ParentContext>
            <Toaster />
        </>
    )
}