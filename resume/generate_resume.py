#!/usr/bin/env python3
"""Generate a structured PDF resume for Галиуллина Ангелина Марселевна."""

from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

pdfmetrics.registerFont(TTFont("DejaVu", FONT_REG))
pdfmetrics.registerFont(TTFont("DejaVuBold", FONT_BOLD))

ACCENT = HexColor("#1a4a6e")
MUTED = HexColor("#4a5568")
LINE = HexColor("#c5d0db")
BG_SIDE = HexColor("#1a4a6e")

OUT = Path(__file__).resolve().parent / "Galiullina_Angelina_Resume.pdf"


def build_styles():
    styles = getSampleStyleSheet()

    styles.add(
        ParagraphStyle(
            name="Name",
            fontName="DejaVuBold",
            fontSize=20,
            leading=26,
            textColor=ACCENT,
            alignment=TA_LEFT,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Subtitle",
            fontName="DejaVu",
            fontSize=10,
            leading=14,
            textColor=MUTED,
            alignment=TA_LEFT,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Contact",
            fontName="DejaVu",
            fontSize=9.5,
            leading=14,
            textColor=HexColor("#2d3748"),
            alignment=TA_LEFT,
            spaceAfter=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            fontName="DejaVuBold",
            fontSize=12,
            leading=16,
            textColor=ACCENT,
            spaceBefore=14,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="JobTitle",
            fontName="DejaVuBold",
            fontSize=10.5,
            leading=14,
            textColor=HexColor("#1a202c"),
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Meta",
            fontName="DejaVu",
            fontSize=9,
            leading=12,
            textColor=MUTED,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            fontName="DejaVu",
            fontSize=9.5,
            leading=14,
            textColor=HexColor("#2d3748"),
            alignment=TA_JUSTIFY,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletItem",
            fontName="DejaVu",
            fontSize=9.5,
            leading=14,
            textColor=HexColor("#2d3748"),
            leftIndent=12,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TagLine",
            fontName="DejaVu",
            fontSize=9.5,
            leading=15,
            textColor=HexColor("#2d3748"),
            spaceAfter=2,
        )
    )
    return styles


def section_line():
    return HRFlowable(
        width="100%",
        thickness=1,
        color=LINE,
        spaceBefore=0,
        spaceAfter=8,
    )


def build():
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title="Резюме — Галиуллина Ангелина Марселевна",
        author="Галиуллина Ангелина Марселевна",
    )

    story = []

    # Header
    story.append(Paragraph("Галиуллина Ангелина Марселевна", styles["Name"]))
    story.append(Paragraph("Мастер маникюра · сфера красоты", styles["Subtitle"]))
    story.append(Spacer(1, 6))
    story.append(section_line())

    # Contacts / personal
    story.append(Paragraph("КОНТАКТЫ И ЛИЧНЫЕ ДАННЫЕ", styles["Section"]))
    story.append(section_line())
    contacts = [
        "Пол: женский · Возраст: 19 лет",
        "Дата рождения: 4 сентября 2007 г.",
        "Город: Набережные Челны",
        "Телефон: +7 (939) 303-30-23",
    ]
    for line in contacts:
        story.append(Paragraph(line, styles["Contact"]))

    # Experience
    story.append(Paragraph("ОПЫТ РАБОТЫ", styles["Section"]))
    story.append(section_line())
    story.append(Paragraph("Мастер маникюра", styles["JobTitle"]))
    story.append(Paragraph("Сфера красоты · 1 год", styles["Meta"]))
    story.append(
        Paragraph(
            "Работа с мелкими деталями, инструментами и материалами; "
            "соблюдение точности и аккуратности при выполнении процедур.",
            styles["Body"],
        )
    )
    bullets = [
        "Поэтапное выполнение процедур с контролем качества на каждом этапе",
        "Соблюдение порядка на рабочем месте и санитарных стандартов",
        "Развитие усидчивости, внимательности к деталям и точности",
        "Самостоятельный контроль результата перед сдачей работы клиенту",
    ]
    for b in bullets:
        story.append(Paragraph(f"•  {b}", styles["BulletItem"]))

    # Skills from experience
    story.append(Paragraph("ПРОФЕССИОНАЛЬНЫЕ НАВЫКИ", styles["Section"]))
    story.append(section_line())
    skills = [
        "Точная работа с инструментами и материалами",
        "Внимание к мелким деталям и качеству результата",
        "Организация рабочего места и поэтапное выполнение задач",
        "Быстрое освоение новых техник и материалов",
    ]
    for s in skills:
        story.append(Paragraph(f"•  {s}", styles["BulletItem"]))

    # Personal qualities
    story.append(Paragraph("ЛИЧНЫЕ КАЧЕСТВА", styles["Section"]))
    story.append(section_line())
    qualities = [
        "Ответственность",
        "Внимательность и аккуратность",
        "Усидчивость и дисциплинированность",
        "Быстрое обучение новым навыкам",
        "Готовность работать в команде",
    ]
    for q in qualities:
        story.append(Paragraph(f"•  {q}", styles["BulletItem"]))

    # Goal / about
    story.append(Paragraph("О СЕБЕ", styles["Section"]))
    story.append(section_line())
    story.append(
        Paragraph(
            "Ответственный и внимательный специалист с опытом работы "
            "в сфере красоты. Привыкла выполнять задачи аккуратно, "
            "поэтапно и с контролем качества. Готова развиваться "
            "в профессии и эффективно работать в команде.",
            styles["Body"],
        )
    )

    doc.build(story)
    print(f"Created: {OUT}")


if __name__ == "__main__":
    build()
