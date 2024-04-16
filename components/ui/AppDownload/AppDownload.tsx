export default function AppDownload() {
  return (
    <>
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8 flex justify-center">
          <div className="sm:flex sm:items-center sm:flex-col sm:align-center w-full sm:w-2/3">
            <h1 className="text-2xl font-extrabold text-white sm:text-center sm:text-4xl">
              App Download
            </h1>
            <a href="https://play.google.com/store/apps/details?id=com.bigjpgapp.photoenhancer.aiupscale&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
              <img
                width={200}
                alt="Get it on Google Play"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
