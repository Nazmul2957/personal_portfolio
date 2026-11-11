import { jsPDF } from "jspdf";
import {
  UserProfile,
  Skill,
  Project,
  Experience,
  Education,
  Reference,
  Testimonial,
  Achievement,
} from "@/types";

export interface CvData {
  profile: UserProfile;
  skills?: Skill[];
  projects?: Project[];
  experiences?: Experience[];
  education?: Education[];
  references?: Reference[];
  testimonials?: Testimonial[];
  achievements?: Achievement[];
}

/**
 * Generates an executive, ATS-friendly, beautifully structured PDF CV
 * using live data retrieved from the portfolio APIs.
 */
export async function generatePdfCv(data: CvData): Promise<void> {
  const {
    profile,
    skills = [],
    projects = [],
    experiences = [],
    education = [],
    references = [],
    testimonials = [],
    achievements = [],
  } = data;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 18;
  const marginTop = 18;
  const marginBottom = 18;
  const contentWidth = pageWidth - marginX * 2; // 174mm

  let y = marginTop;

  // Colors
  const COLOR_PRIMARY = [15, 23, 42] as const; // #0f172a Slate 900
  const COLOR_ACCENT = [79, 70, 229] as const; // #4f46e5 Indigo 600
  const COLOR_BODY = [51, 65, 85] as const; // #334155 Slate 700
  const COLOR_MUTED = [100, 116, 139] as const; // #64748b Slate 500
  const COLOR_BORDER = [226, 232, 240] as const; // #e2e8f0 Slate 200

  // Helper: Page Break Check
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - marginBottom) {
      doc.addPage();
      // Draw top subtle line on new pages
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, pageWidth, 2.5, "F");
      y = marginTop;
      return true;
    }
    return false;
  };

  // Helper: Draw Section Header with pill accent
  const drawSectionHeader = (title: string) => {
    checkPageBreak(16);
    y += 3;

    // Small vertical accent pill
    doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.roundedRect(marginX, y - 3.8, 3, 5, 0.8, 0.8, "F");

    // Title text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    const upperTitle = title.toUpperCase();
    doc.text(upperTitle, marginX + 5.5, y);

    // Subtle horizontal rule
    const textWidth = doc.getTextWidth(upperTitle);
    const lineX = marginX + 5.5 + textWidth + 4;
    if (lineX < marginX + contentWidth) {
      doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
      doc.setLineWidth(0.35);
      doc.line(lineX, y - 1, marginX + contentWidth, y - 1);
    }

    y += 6;
  };

  // ================= 1. HEADER SECTION =================
  // Top aesthetic gradient/accent line
  doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.rect(0, 0, pageWidth, 4, "F");

  // Candidate Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text(profile.name || "Curriculum Vitae", marginX, y + 2);
  y += 7.5;

  // Title / Tagline
  const candidateTitle = profile.title || profile.tagline || "Software Engineer";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.text(candidateTitle, marginX, y + 1);
  y += 5.5;

  // Contact Info Row 1 (Location, Phone, Email)
  const contactParts: string[] = [];
  if (profile.location) contactParts.push(profile.location);
  if (profile.phone) contactParts.push(profile.phone);
  if (profile.email) contactParts.push(profile.email);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);

  if (contactParts.length > 0) {
    doc.text(contactParts.join("   •   "), marginX, y);
    y += 4;
  }

  // Contact Info Row 2 (LinkedIn, GitHub, Website)
  const webLinks: string[] = [];
  if (profile.socialLinks?.linkedin) {
    webLinks.push(`LinkedIn: ${profile.socialLinks.linkedin.replace(/^https?:\/\/(www\.)?/, "")}`);
  }
  if (profile.socialLinks?.github) {
    webLinks.push(`GitHub: ${profile.socialLinks.github.replace(/^https?:\/\/(www\.)?/, "")}`);
  }
  if (profile.socialLinks?.website) {
    webLinks.push(`Portfolio: ${profile.socialLinks.website.replace(/^https?:\/\/(www\.)?/, "")}`);
  }

  if (webLinks.length > 0) {
    doc.text(webLinks.join("   •   "), marginX, y);
    y += 4.5;
  }

  // Header separator
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.setLineWidth(0.4);
  doc.line(marginX, y, marginX + contentWidth, y);
  y += 4;

  // ================= 2. PROFESSIONAL SUMMARY =================
  if (profile.bio) {
    drawSectionHeader("Professional Summary");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

    const bioLines = doc.splitTextToSize(profile.bio, contentWidth);
    checkPageBreak(bioLines.length * 4.2 + 2);
    doc.text(bioLines, marginX, y);
    y += bioLines.length * 4.2 + 3;
  }

  // ================= 3. CORE TECHNICAL SKILLS =================
  if (skills && skills.length > 0) {
    drawSectionHeader("Technical Skills");

    // Group skills by category
    const skillsByCategory: Record<string, string[]> = {};
    skills.forEach((skill) => {
      const cat = skill.category || "General";
      if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
      const label = skill.name + (skill.level ? ` (${skill.level})` : "");
      skillsByCategory[cat].push(label);
    });

    const categories = Object.keys(skillsByCategory);
    categories.forEach((cat) => {
      const skillString = skillsByCategory[cat].join(", ");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      const catLabel = `${cat}: `;
      const catWidth = doc.getTextWidth(catLabel);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      const valueLines = doc.splitTextToSize(skillString, contentWidth - catWidth);

      checkPageBreak(valueLines.length * 4 + 2);

      // Print category label
      doc.setFont("helvetica", "bold");
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text(catLabel, marginX, y);

      // Print skills
      doc.setFont("helvetica", "normal");
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      doc.text(valueLines, marginX + catWidth, y);

      y += valueLines.length * 4 + 1.5;
    });

    y += 2;
  }

  // ================= 4. WORK EXPERIENCE =================
  if (experiences && experiences.length > 0) {
    drawSectionHeader("Work Experience");

    experiences.forEach((exp) => {
      checkPageBreak(22);

      // Role (Bold, Primary) & Date (Right-aligned, Muted)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text(exp.role, marginX, y);

      const dateStr = [exp.startDate, exp.endDate || (exp.isCurrent ? "Present" : "")]
        .filter(Boolean)
        .join(" – ");
      if (dateStr) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
        doc.text(dateStr, marginX + contentWidth, y, { align: "right" });
      }
      y += 4.2;

      // Company, Location & Employment Type (Accent / Subtitle)
      const companyMeta = [
        exp.company,
        exp.location,
        exp.employmentType ? `(${exp.employmentType})` : null,
      ]
        .filter(Boolean)
        .join(" • ");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
      doc.text(companyMeta, marginX, y);
      y += 4.5;

      // Achievements / Description bullets
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

      const items: string[] =
        exp.achievements && exp.achievements.length > 0
          ? exp.achievements
          : exp.description
          ? exp.description
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
          : [];

      items.forEach((item) => {
        // Remove existing bullet characters if any
        const cleaned = item.replace(/^[•\-\*]\s*/, "");
        const lines = doc.splitTextToSize(cleaned, contentWidth - 6);
        checkPageBreak(lines.length * 3.8 + 1.5);

        // Bullet dot
        doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
        doc.text("•", marginX + 1.5, y);

        // Text
        doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
        doc.text(lines, marginX + 5, y);
        y += lines.length * 3.8 + 1.2;
      });

      // Tech Used
      if (exp.techUsed && exp.techUsed.length > 0) {
        checkPageBreak(5);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
        const stackLabel = "Technologies: ";
        const labelW = doc.getTextWidth(stackLabel);
        doc.text(stackLabel, marginX + 5, y);

        doc.setFont("helvetica", "normal");
        const stackText = exp.techUsed.join(", ");
        const stackLines = doc.splitTextToSize(stackText, contentWidth - 5 - labelW);
        doc.text(stackLines, marginX + 5 + labelW, y);
        y += stackLines.length * 3.5 + 2;
      }

      y += 3;
    });
  }

  // ================= 5. FEATURED PROJECTS =================
  if (projects && projects.length > 0) {
    drawSectionHeader("Featured Projects");

    // Take top projects (up to 5 to keep CV concise)
    const featuredList = projects.slice(0, 5);

    featuredList.forEach((proj) => {
      checkPageBreak(18);

      // Title & Category
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      const projTitle = proj.title + (proj.category ? `  [${proj.category}]` : "");
      doc.text(projTitle, marginX, y);

      // Links (Live URL or GitHub)
      const link = proj.liveUrl || proj.githubUrl;
      if (link) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
        const shortLink = link.replace(/^https?:\/\/(www\.)?/, "").slice(0, 40);
        doc.text(shortLink, marginX + contentWidth, y, { align: "right" });
      }
      y += 4.2;

      // Description
      if (proj.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
        const descLines = doc.splitTextToSize(proj.description, contentWidth);
        checkPageBreak(descLines.length * 3.8 + 1);
        doc.text(descLines, marginX, y);
        y += descLines.length * 3.8 + 1.5;
      }

      // Tech Stack
      if (proj.techStack && proj.techStack.length > 0) {
        checkPageBreak(5);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
        const stackLabel = "Stack: ";
        const labelW = doc.getTextWidth(stackLabel);
        doc.text(stackLabel, marginX, y);

        doc.setFont("helvetica", "normal");
        const stackText = proj.techStack.join(" • ");
        const stackLines = doc.splitTextToSize(stackText, contentWidth - labelW);
        doc.text(stackLines, marginX + labelW, y);
        y += stackLines.length * 3.5 + 2.5;
      }

      y += 2.5;
    });
  }

  // ================= 6. EDUCATION =================
  if (education && education.length > 0) {
    drawSectionHeader("Education & Credentials");

    education.forEach((edu) => {
      checkPageBreak(14);

      // Degree & Dates
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      const degreeTitle = [edu.degree, edu.fieldOfStudy].filter(Boolean).join(" in ");
      doc.text(degreeTitle || "Degree", marginX, y);

      const dateStr = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
      if (dateStr) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
        doc.text(dateStr, marginX + contentWidth, y, { align: "right" });
      }
      y += 4.2;

      // Institution & Location & Grade
      const eduMeta = [
        edu.institution,
        edu.location,
        edu.grade ? `Grade: ${edu.grade}` : null,
      ]
        .filter(Boolean)
        .join(" • ");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      doc.text(eduMeta, marginX, y);
      y += 4;

      if (edu.description) {
        const descLines = doc.splitTextToSize(edu.description, contentWidth);
        checkPageBreak(descLines.length * 3.8);
        doc.text(descLines, marginX, y);
        y += descLines.length * 3.8 + 2;
      }

      y += 2.5;
    });
  }

  // ================= 7. HONORS, AWARDS & CERTIFICATIONS =================
  if (achievements && achievements.length > 0) {
    drawSectionHeader("Honors, Awards & Certifications");

    achievements.forEach((ach) => {
      checkPageBreak(16);

      // Title & Category tag
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      const achTitle = ach.title + (ach.category ? `  [${ach.category}]` : "");
      doc.text(achTitle, marginX, y);

      // Date (Right-aligned)
      const dateParts = [ach.issueDate, ach.expiryDate ? `Exp: ${ach.expiryDate}` : ""].filter(Boolean);
      const dateStr = dateParts.join(" • ");
      if (dateStr) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
        doc.text(dateStr, marginX + contentWidth, y, { align: "right" });
      }
      y += 4.2;

      // Organization & Credential Meta
      const metaParts: string[] = [];
      if (ach.organization) metaParts.push(ach.organization);
      if (ach.credentialId) metaParts.push(`Credential ID: ${ach.credentialId}`);

      if (metaParts.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
        doc.text(metaParts.join("  •  "), marginX, y);
        y += 4;
      }

      // Verification URL if provided
      if (ach.credentialUrl) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
        const shortUrl = `Verify: ${ach.credentialUrl.replace(/^https?:\/\/(www\.)?/, "").slice(0, 50)}`;
        doc.text(shortUrl, marginX, y);
        y += 3.8;
      }

      // Description if provided
      if (ach.description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
        const descLines = doc.splitTextToSize(ach.description, contentWidth);
        checkPageBreak(descLines.length * 3.8 + 1);
        doc.text(descLines, marginX, y);
        y += descLines.length * 3.8 + 1.5;
      }

      y += 2.5;
    });
  }

  // ================= 8. REFERENCES =================
  if (references && references.length > 0) {
    drawSectionHeader("Professional References");

    references.slice(0, 3).forEach((ref) => {
      checkPageBreak(12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text(ref.name, marginX, y);

      const meta = [ref.position, ref.company, ref.email, ref.phone]
        .filter(Boolean)
        .join(" • ");

      if (meta) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
        y += 4;
        doc.text(meta, marginX, y);
      }
      y += 4;
    });
  } else if (testimonials && testimonials.length > 0) {
    // If no explicit references, show 1-2 verified testimonials as endorsements
    drawSectionHeader("Endorsements & Testimonials");

    testimonials.slice(0, 2).forEach((test) => {
      checkPageBreak(14);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

      const quoteLines = doc.splitTextToSize(`"${test.quote}"`, contentWidth);
      doc.text(quoteLines, marginX, y);
      y += quoteLines.length * 3.8 + 2;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      const authorText = `— ${test.authorName}, ${test.authorRole} at ${test.company}`;
      doc.text(authorText, marginX, y);
      y += 5;
    });
  }

  // ================= FOOTER ON ALL PAGES =================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Subtle divider line
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.3);
    doc.line(marginX, pageHeight - 12, marginX + contentWidth, pageHeight - 12);

    // Footer text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`${profile.name || "Portfolio"} — Curriculum Vitae`, marginX, pageHeight - 7);
    doc.text(
      `Page ${i} of ${totalPages}`,
      marginX + contentWidth,
      pageHeight - 7,
      { align: "right" }
    );
  }

  // ================= SAVE / DOWNLOAD PDF =================
  const sanitizedName = (profile.name || "Nazmul_Hossain")
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "_");
  doc.save(`${sanitizedName}_CV.pdf`);
}
