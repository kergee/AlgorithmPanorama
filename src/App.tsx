import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Menu, X, ChevronRight, Hash } from 'lucide-react';
import { algorithmData, Category } from './data/algorithms';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(algorithmData[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter algorithms based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return algorithmData;
    
    const query = searchQuery.toLowerCase();
    return algorithmData.map(category => {
      const filteredAlgorithms = category.algorithms.filter(
        algo => 
          algo.name.toLowerCase().includes(query) || 
          algo.subtitle.toLowerCase().includes(query) ||
          algo.details.some(detail => detail.value.toLowerCase().includes(query))
      );
      return { ...category, algorithms: filteredAlgorithms };
    }).filter(category => category.algorithms.length > 0);
  }, [searchQuery]);

  const currentCategoryData = searchQuery 
    ? filteredData 
    : algorithmData.filter(c => c.id === activeCategory);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-lg">
          <BookOpen className="w-6 h-6" />
          <span>算法全景图</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-72 lg:w-80 bg-white border-r border-slate-200 
        fixed md:sticky top-[61px] md:top-0 h-[calc(100vh-61px)] md:h-screen 
        overflow-y-auto z-10 shrink-0
      `}>
        <div className="p-6 hidden md:flex items-center gap-3 text-indigo-600 font-bold text-xl border-b border-slate-100">
          <BookOpen className="w-7 h-7" />
          <span>算法全景图</span>
        </div>
        
        <nav className="p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
            知识图谱目录
          </div>
          {algorithmData.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSearchQuery('');
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors
                ${activeCategory === category.id && !searchQuery
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <Hash className={`w-4 h-4 ${activeCategory === category.id && !searchQuery ? 'text-indigo-500' : 'text-slate-400'}`} />
              <span className="text-sm truncate">{category.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Bar with Search */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 px-6 py-4 shrink-0">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text"
                placeholder="搜索算法名称、原理或应用场景..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 rounded-xl text-sm transition-all outline-none"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-12 pb-20">
            {currentCategoryData.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">未找到相关算法</h3>
                <p className="text-slate-500 mt-2">尝试使用其他关键词搜索</p>
              </div>
            ) : (
              currentCategoryData.map((category) => (
                <section key={category.id} className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-8 bg-indigo-500 rounded-full inline-block"></span>
                    {category.title}
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.algorithms.map((algo, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group"
                      >
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {algo.name}
                          </h3>
                          <p className="text-sm font-medium text-indigo-500 mt-1">
                            {algo.subtitle}
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          {algo.details.map((detail, dIdx) => (
                            <div key={dIdx} className="text-sm">
                              <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded mr-2">
                                {detail.label}
                              </span>
                              <span className="text-slate-600 leading-relaxed">
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {algo.pseudocode && (
                          <div className="mt-5 pt-5 border-t border-slate-100">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">伪代码 (Pseudocode)</div>
                            <pre className="bg-slate-800 text-slate-50 p-4 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed shadow-inner">
                              <code>{algo.pseudocode}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
