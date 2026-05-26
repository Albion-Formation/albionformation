import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buyerWhatWeNeedContent } from "@/data/buyerWhatWeNeedContent";
import { ArrowUp, CheckCircle2, ClipboardList, FileText, Plus, ShieldCheck } from "lucide-react";

const BuyerWhatWeNeedSection = () => {
  const { title, information, documents, closing } = buyerWhatWeNeedContent;

  return (
    <section className="border-t border-border/60 bg-background py-16 md:py-24" aria-label={title}>
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden border-border/60 bg-secondary/30 p-6">
            <ClipboardList className="size-5 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{information.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {information.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <InformationIllustration />
          </Card>

          <Card className="group overflow-hidden border-border/60 bg-secondary/30 px-6 pt-6">
            <FileText className="size-5 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{documents.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {documents.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <DocumentsIllustration />
          </Card>

          <Card className="group overflow-hidden border-border/60 bg-secondary/30 px-6 pt-6 md:col-span-2 lg:col-span-1">
            <ShieldCheck className="size-5 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 text-lg font-semibold text-foreground">Simple verification</h3>
            <p className="mt-3 text-balance text-sm leading-relaxed text-muted-foreground">{closing}</p>
            <VerificationIllustration />
          </Card>
        </div>
      </div>
    </section>
  );
};

const InformationIllustration = () => (
  <Card aria-hidden className="mt-8 aspect-video p-4">
    <div className="mb-3 text-sm font-semibold">Client intake form</div>
    <div className="space-y-2.5">
      {["Full legal name", "Residential address", "Business activity"].map((field) => (
        <div key={field} className="rounded-md border border-border/60 bg-background/80 px-3 py-2">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{field}</div>
          <div className="mt-1 h-2 w-3/4 rounded-full bg-foreground/10" />
        </div>
      ))}
    </div>
  </Card>
);

const DocumentsIllustration = () => (
  <div aria-hidden className="relative mt-6">
    <Card className="aspect-video w-4/5 translate-y-4 p-3 transition-transform duration-200 ease-in-out group-hover:-rotate-2">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex size-6 items-center justify-center rounded-full border bg-background text-[10px] font-bold text-primary">
          ID
        </div>
        <span className="text-sm font-medium text-muted-foreground">Passport / government ID</span>
      </div>
      <div className="ml-2 space-y-2">
        <div className="h-2 rounded-full bg-foreground/10" />
        <div className="h-2 w-4/5 rounded-full bg-foreground/10" />
        <div className="h-2 w-3/5 rounded-full bg-foreground/10" />
      </div>
      <FileText className="ml-2 mt-3 size-5 text-muted-foreground" strokeWidth={1.5} />
    </Card>
    <Card className="absolute -top-3 right-0 flex aspect-[3/5] w-2/5 translate-y-4 p-2 transition-transform duration-200 ease-in-out group-hover:rotate-2">
      <div className="m-auto flex size-10 items-center justify-center rounded-full bg-foreground/5">
        <CheckCircle2 className="size-4 text-primary" strokeWidth={1.5} />
      </div>
    </Card>
  </div>
);

const VerificationIllustration = () => (
  <Card
    aria-hidden
    className="mt-6 aspect-video translate-y-4 p-4 pb-6 transition-transform duration-200 group-hover:translate-y-0"
  >
    <div className="w-fit">
      <CheckCircle2 className="size-4 text-primary" strokeWidth={1.5} />
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        Submit your details — we verify and appoint your nominee director.
      </p>
    </div>
    <div className="-mx-3 -mb-3 mt-3 space-y-3 rounded-lg bg-foreground/5 p-3">
      <div className="text-sm text-muted-foreground">Ready to proceed?</div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="size-7 rounded-2xl bg-transparent shadow-none">
            <Plus />
          </Button>
          <Button variant="outline" size="icon" className="size-7 rounded-2xl bg-transparent shadow-none">
            <FileText />
          </Button>
        </div>
        <Button size="icon" className="size-7 rounded-2xl bg-primary">
          <ArrowUp strokeWidth={3} />
        </Button>
      </div>
    </div>
  </Card>
);

export default BuyerWhatWeNeedSection;
