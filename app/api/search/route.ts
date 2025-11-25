import { NextRequest, NextResponse } from 'next/server'
import { searchIndex } from '@/lib/search-data'

const normalize = (text: string) => text.trim().toLowerCase()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') ?? searchParams.get('query') ?? ''
  const normalizedQuery = normalize(query)

  if (!normalizedQuery) {
    return NextResponse.json({
      query: '',
      results: searchIndex.slice(0, 6),
    })
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean)

  const ranked = searchIndex
    .map((item) => {
      const haystack = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase()
      const score = terms.reduce((acc, term) => (haystack.includes(term) ? acc + 1 : acc), 0)
      return { item, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ item }) => item)

  return NextResponse.json({
    query: normalizedQuery,
    results: ranked,
  })
}


