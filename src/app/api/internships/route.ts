import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://internshala.com/hiring/search", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
      },
      next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Internshala: ${response.statusText}`);
    }

    const data = await response.json();
    
    const ids = data.internship_ids || [];
    const meta = data.internships_meta || {};

    const internships = ids.map((id: number) => {
      const item = meta[id];
      if (!item) return null;

      return {
        id: item.id.toString(),
        role: item.title || "Intern",
        company: item.company_name || "Company",
        logoInitial: (item.company_name || "C").charAt(0).toUpperCase(),
        location: item.location_names && item.location_names.length > 0 
          ? item.location_names.join(", ") 
          : (item.work_from_home ? "Remote" : "On-site"),
        workMode: item.work_from_home ? "Remote" : "On-site",
        stipend: item.stipend?.salary ? item.stipend.salary.replace(/₹/g, "₹").trim() : "Unpaid",
        duration: item.duration || "N/A",
        type: item.ppo_label_value === "With job offer" ? "Internship with Job Offer" : "Internship",
        activelyHiring: true,
        postedAgo: item.posted_by_label || item.posted_on || "Just now"
      };
    }).filter(Boolean); // Remove nulls

    return NextResponse.json({ success: true, data: internships });
  } catch (error) {
    console.error("Error fetching internships:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch internships" },
      { status: 500 }
    );
  }
}
