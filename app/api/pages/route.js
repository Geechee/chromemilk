import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(req) {
  const body = await req.json()
  const { url, title, text, excerpt, domain, wordCount } = body
  if (!url || !title) return NextResponse.json({ error: 'url and title required' }, { status: 400 })

  const page = await prisma.page.create({
    data: { url, title, text: text || '', excerpt, domain, wordCount }
  })
  return NextResponse.json(page)
}

export async function GET() {
  const pages = await prisma.page.findMany({
    orderBy: { extractedAt: 'desc' },
    take: 50,
    select: { id: true, title: true, url: true, excerpt: true, domain: true, wordCount: true, extractedAt: true }
  })
  return NextResponse.json(pages)
}
