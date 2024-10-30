// src/hooks/useSidebar.ts
import { useState } from "react";

export type SidebarSection = "tasks" | "brand" | "messages" | "profile";

export const useSidebar = () => {
    const [activeSection, setActiveSection] = useState<SidebarSection>("tasks");

    const switchSection = (section: SidebarSection) => {
        setActiveSection(section);
    };

    return { activeSection, switchSection };
};
