
const aboutDataList = [
  {
    info: '2012',
    title: 'Founded'
  },
  {
    info: '40K+',
    title: 'Graduates'
  },
  {
    info: '50+',
    title: 'Partner Companies'
  },
  {
    info: '5',
    title: 'Branches'
  },
  {
    info: '20',
    title: 'Diplomas Available'
  },
]

export default function AuthAbout() {
    return (

        <>
            <article className="lg:col-span-7 flex flex-col space-y-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue tracking-tight mb-3">
                        Route Posts
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 leading-normal">
                        Connect with friends and the world around you on Route Posts.
                    </p>
                </div>

                {/* About Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-2 md:p-4 shadow-sm">
                    <span className="text-xs font-bold text-brand-blue tracking-wider uppercase block mb-2">
                        About Route Academy
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-brand-dark-blue mb-4">
                        Egypt's Leading IT Training Center Since 2012
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-4">
                        Route Academy is the premier IT training center in Egypt, established in 2012. We
                        specialize in delivering high-quality training courses in programming, web development,
                        and application development. We've identified the unique challenges people may face
                        when learning new technology and made efforts to provide strategies to overcome them.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {aboutDataList.map((aboutItem) =>
                            <div key={aboutItem.info} className="bg-gray-100 p-2 ps-4 rounded-xl border border-blue-50/50">
                                <span className="block  text-sm font-bold text-brand-blue">{aboutItem.info}</span>
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{aboutItem.title}</span>
                            </div>)}
                    </div>
                </div>
            </article>
        </>
    )
}