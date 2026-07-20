import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(req) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q) return NextResponse.json([])

  const pages = await prisma.page.findMany({
    where: {
      OR: [
        { title: { contains: q } },
        { text: { contains: q } },
        { excerpt: { contains: q } },
        { domain: { contains: q } },
      ]
    },
    orderBy: { extractedAt: 'desc' },
    take: 20,
    select: { id: true, title: true, url: true, excerpt: true, domain: true, extractedAt: true }
  })
  return NextResponse.json(pages)
}
