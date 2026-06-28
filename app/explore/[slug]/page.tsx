import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Search, Target, Zap } from 'lucide-react'

// Programmatic SEO (pSEO) Dynamic Metadata Generator
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const keyword = decodeURIComponent(params.slug).replace(/-/g, ' ')
  
  return {
    title: `${keyword.toUpperCase()} | Nakul Mundhada & BiovaCo Nexus`,
    description: `Comprehensive information and resources regarding ${keyword}. Discover how Nakul Mundhada and BiovaCo Nexus are innovating and leading in this sector.`,
    keywords: [keyword, "BiovaCo Nexus", "Nakul Mundhada", "Innovation", "Cravora", "Tech"],
  }
}

export default function ExplorePage({ params }: { params: { slug: string } }) {
  const keyword = decodeURIComponent(params.slug).replace(/-/g, ' ')
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full mb-6">
            <Search className="w-4 h-4 mr-2" />
            <span className="text-xs font-bold tracking-widest uppercase">AI-Generated Search Result</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 capitalize leading-tight tracking-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{keyword}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            You searched for <strong className="text-white">{keyword}</strong>. As the Founder and MD of BiovaCo Nexus, I am dedicated to pioneering solutions and delivering excellence across this domain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Strategic Relevance</h3>
            <p className="text-gray-400 leading-relaxed">
              Our enterprise approach to <span className="capitalize text-gray-200">{keyword}</span> focuses on sustainable impact, leveraging deep-tech and market intelligence to outpace the competition.
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Innovation & Execution</h3>
            <p className="text-gray-400 leading-relaxed">
              BiovaCo Nexus integrates advanced methodologies in <span className="capitalize text-gray-200">{keyword}</span> to deliver exceptional consumer value and scalable business models.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all hover:scale-105"
          >
            Return to Main Portfolio
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
