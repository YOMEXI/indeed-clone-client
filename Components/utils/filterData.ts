export const filterData = [
  {
    items: [
      { name: "Location", value: "" },
      {
        name: "Abuja",
        value: "abuja",
      },
      { name: "Lagos", value: "lagos" },
    ],
    Placeholder: "Location",
    queryName: "location",
  },
  {
    items: [
      { name: "Experience", value: "" },
      { name: "entry level", value: "entryLevel" },
      { name: "1 to 3 years", value: "1to3years" },
      { name: "Above 4years", value: "Above4years" },
    ],
    Placeholder: "Experience",
    queryName: "exp",
  },

  {
    items: [
      { name: "Category", value: "" },
      { name: "finance", value: "finance" },
      { name: "information technology", value: "informationtechnology" },
      { name: "customer service/sales", value: "CustomerService" },
    ],
    Placeholder: "Category",
    queryName: "category",
  },
];

export const getFilterValues = (filterValues: any) => {
  const { exp, location, category } = filterValues;

  const values = [
    {
      name: "location",
      value: location,
    },
    {
      name: "category",
      value: category,
    },
    {
      name: "exp",
      value: exp,
    },
  ];
  return values;
};
