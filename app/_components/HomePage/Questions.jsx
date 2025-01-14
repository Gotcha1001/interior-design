import React from "react";


import FeatureMotionWrapper from "../MotionStuff/FeatureMotionWrapperMap";
import faqs from './faqs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const Questions = () => {
    return (
        <section id="features" className="gradient-background5 py-20 px-5">
            <div className="container mx-auto">
                <h3 className="text-3xl font-bold mb-12 text-center">
                    Frequently Asked Questions
                </h3>

                <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                        <FeatureMotionWrapper key={index} index={index}>
                            <AccordionItem className="w-full" value={`item-${index}`}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        </FeatureMotionWrapper>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default Questions;
