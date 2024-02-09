import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export default function FAQ() {
  return (
    <>
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8 flex justify-center">
          <div className="sm:flex sm:flex-col sm:align-center w-full sm:w-2/3">
            <h1 className="text-2xl font-extrabold text-white sm:text-center sm:text-4xl">
              FAQ
            </h1>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How does upscaleimage enlarge images?
                </AccordionTrigger>
                <AccordionContent>
                  Using the latest Deep Convolutional Neural Networks,
                  upscaleimage intelligently reduces noise and serration in
                  images. This allows the images to be enlarged without losing
                  quality.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Does upscaleimage support API?
                </AccordionTrigger>
                <AccordionContent>
                  WIP! You will find it after logging in.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How does upscaleimage compare to other tools?
                </AccordionTrigger>
                <AccordionContent>
                  With other software and tools, such as PS, an enlarged image
                  can still look fuzzy and have visible blur as well as noise.
                  Our product uses neural networks with a special algorithm
                  adjusted specifically for the images' lines and color. This
                  makes the resulting image much higher quality. Colors are well
                  kept, and there is almost no 'glitter' or doubling visible.
                  More importantly, the noise, which seriously influences
                  quality, cannot be seen in the resulting images.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  What images are best enlarged?
                </AccordionTrigger>
                <AccordionContent>
                  Anime images and illustrations are nearly perfectly processed,
                  colors, details and edges are all well kept. Regular photos
                  are supported as well.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  What are the maximum limits on uploaded image?
                </AccordionTrigger>
                <AccordionContent>
                  Currently free user 3000x3000px, 5M; paid user 50M.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>How about the speed?</AccordionTrigger>
                <AccordionContent>
                  The estimated remaining time will be shown once the process
                  starts. Based on the original size & enlarging configurations,
                  the time needed is different. The actual processing time is
                  usually much shorter than that estimated. This depends on
                  server traffic/time of day, as well.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>My enlarging failed! Why?</AccordionTrigger>
                <AccordionContent>
                  Depending on your network environment and the current number
                  of online users of upscaleimage.com, there is a small chance
                  that your enlarging will fail. If you encounter such a
                  problem, please simply try again.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>
                  Should I keep my browser open after starting?
                </AccordionTrigger>
                <AccordionContent>
                  If you have not logged in, yes! You need to keep your browser
                  open otherwise, the enlarged image will be lost. If you have
                  already logged in, you can close your browser as we support
                  offline enlarging.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger>
                  How do I view my enlargment history?
                </AccordionTrigger>
                <AccordionContent>
                  Enlarging history can be viewed after logging in.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-10">
                <AccordionTrigger>
                  I want to enlarge more and bigger images. How can I do that?
                </AccordionTrigger>
                <AccordionContent>
                  In order to support the maintenance of this website, we offer
                  paid services. Once upgraded, you can use an independent
                  high-performance server to make your enlarging faster, more
                  stable, and more.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-11">
                <AccordionTrigger>Privacy policy?</AccordionTrigger>
                <AccordionContent>
                  Uploaded images and enlarged images will be automatically
                  deleted after 5 days. Image links are encrypted. Unless you
                  share the link, no one can download your image or result.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-12">
                <AccordionTrigger>Slow download speed?</AccordionTrigger>
                <AccordionContent>
                  The default server is located in Mainland China. You can log
                  in and change the server to the United States in the settings
                  page to speed up the download.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
