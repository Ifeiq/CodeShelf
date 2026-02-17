import { Icon } from "@iconify/react";

interface PlanItem {
    name: string;
    icon: string;
}

interface Plan {
    name: string;
    price: number;
    items: PlanItem[];
    more: string[];
}

export default function Plan1() {

    const plans: Plan[] = [
        {
            name: "Plan 1",
            price: 99.99,
            items: [
                { name: "Item 1", icon: "tdesign:icon" },
                { name: "Item 2", icon: "tdesign:icon" },
                { name: "Item 3", icon: "tdesign:icon" },
            ],
            more: [
                "tdesign:icon",
                "tdesign:icon"
            ]
        },
    ]

    return (
        <div className="flex flex-row max-lg:flex-col items-center justify-center relative gap-8">
            {plans.map((plan, index) => (
                <div key={index} className=" border-2 border-black rounded-xl px-12 py-8 bg-white rounded-xl py-8">
                    <h1 className="text-2xl font-bold text-black text-center">{plan.name}</h1>
                    <div className="flex flex-col gap-4 items-center justify-center mt-4">
                        {plan.items.map((item, index) => (
                            <div key={index} className="flex flex-row gap-2 items-center justify-center">
                                <Icon icon={item.icon} className="text-2xl text-black" />
                                <span className="text-sm text-black font-bold">{item.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row gap-2 items-center justify-center mt-8">
                        {plan.more.map((more, index) => (
                            <div key={index} className="flex flex-row gap-2 items-center border-2 border-black p-4  justify-center">
                                <Icon icon={more} className="text-2xl text-black" />
                            </div>
                        ))}
                    </div>

                    <h1 className="text-xl font-bold text-black text-center mt-8">${plan.price}</h1>

                    <h1 className="text-lg  mx-auto border-2 border-black rounded-full px-8 py-1 font-bold text-black text-center mt-4">Buy</h1>
                </div>
            ))}
        </div>
    );
}