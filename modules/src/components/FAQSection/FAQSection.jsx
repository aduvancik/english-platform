import React from "react";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <img
          className={`rotate-180 ml-auto text-gray-500 transition-transform duration-350 ease-out ${
            isEnter && "rotate-360"
          }`}
          src="/chevron-icon.svg"
          alt="Chevron"
          width="32px"
        />
      </>
    )}
    className="border-b border-gray-400 text-xl sm:text-2xl p-8"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left hover:bg-slate-100 ${
          isEnter && "bg-slate-200"
        }`,
    }}
    contentProps={{
      className: "transition-height duration-350 ease-out",
    }}
    panelProps={{ className: "py-4 max-w-9/10 text-gray-700" }}
  />
);

const FAQSection = () => {
  return (
    <section className="my-16">
      <h2 className="text-2xl sm:text-3xl font-normal !important mb-8">Залишились запитання?</h2>
      <Accordion transition transitionTimeout={350}>
        <AccordionItem
          header="В якому форматі проходять заняття?"
          initialEntered
        >
          Заняття проходять онлайн у форматі відеоуроків та інтерактивних вправ.
          Ви можете навчатися у своєму темпі або приєднуватися до живих занять
          із викладачем.
        </AccordionItem>

        <AccordionItem header="Який у вас графік проведення занять?">
          Графік навчання гнучкий – ви самі обираєте час для проходження уроків.
          Якщо записалися на живі заняття, то їх розклад можна переглянути у
          вашому кабінеті.
        </AccordionItem>

        <AccordionItem header="Де проходять заняття?">
          Усі заняття проходять на нашій платформі. Для живих занять
          використовується вбудована відеоконференція, а для самостійного
          навчання – інтерактивні модулі та тести.
        </AccordionItem>

        <AccordionItem header="Що робити, якщо учень захворів чи не може бути присутнім на занятті?">
          Якщо ви пропустили заняття, його можна переглянути в записі у вашому
          кабінеті. Якщо це було живе заняття, ви можете домовитися з викладачем
          про перенесення або отримати матеріали для самостійного опрацювання.
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQSection;