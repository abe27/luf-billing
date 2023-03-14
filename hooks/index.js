import { faker } from "@faker-js/faker";

const DateTime = (dte) => {
  let d = new Date(dte);
  return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${(
    "0" + d.getDate()
  ).slice(-2)} ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(
    -2
  )}`;
};

const DateTimeEdi = () => {
  let d = faker.date.between(
    "2022-12-01T00:00:00.000Z",
    "2023-01-31T00:00:00.000Z"
  );
  return `${d.getFullYear()}${("0" + (d.getMonth() + 1)).slice(-2)}${(
    "0" + d.getDate()
  ).slice(-2)}${("0" + d.getHours()).slice(-2)}${("0" + d.getMinutes()).slice(
    -2
  )}${("0" + d.getSeconds()).slice(-2)}`;
};

const DateOnly = (dte) => {
  let d = new Date(dte);
  return `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${(
    "0" + d.getDate()
  ).slice(-2)}`;
};

const ReceiveStatus = (n) => {
  let status = [
    { name: "Success", class: "text-green-600" },
    { name: "In Progress", class: "text-red-700" },
    { name: "Cancel", class: "text-gray-600" },
    { name: "Error", class: "text-rose-800" },
    { name: "New", class: "text-blue-700" },
    { name: "Update", class: "text-indigo-600" },
  ];
  return status[n];
};

const ReceiveCartonStatus = (n) => {
  let status = [
    { name: "Success", class: "text-green-600" },
    { name: "In Progress", class: "text-red-700" },
    { name: "Cancel", class: "text-gray-600" },
    { name: "None", class: "text-rose-800" },
  ];
  // return status[n]
  // Test
  return status[faker.datatype.number({ min: 0, max: status.length - 1 })];
};

const FakerEDI = () => {
  const edi = [
    "OES.WHAE.32T5.SPL",
    "OES.WHAE.32T4.SPL",
    "OES.VCBI.32T4.SPL",
    "OES.VCBI.32T5.SPL",
  ];
  let file = edi[faker.datatype.number({ min: 0, max: edi.length - 1 })];
  let fileType = "ORDER";
  let fileTypeClass = "text-indigo-600";
  if (file.indexOf("W") > 0) {
    fileType = "RECEIVE";
    fileTypeClass = "text-green-600";
  }

  return {
    batch_id: ("00000" + faker.datatype.number({ min: 0, max: 9999 })).slice(
      -5
    ),
    batch_class: fileTypeClass,
    batch_type: fileType,
    batch_no: `${file}${DateTimeEdi()}.TXT`,
    batch_size: `${faker.datatype.number({ min: 1, max: 200 })}kb`,
    batch_upload: DateTime(
      faker.date.between("2022-01-01T00:00:00.000Z", "2023-01-31T00:00:00.000Z")
    ),
    batch_download: DateTime(
      faker.date.between("2022-01-01T00:00:00.000Z", "2023-01-31T00:00:00.000Z")
    ),
  };
};

const EdiStatus = () => {
  let status = [
    {
      name: "Success",
      class: "text-green-600",
    },
    {
      name: "In Progress",
      class: "text-indigo-700",
    },
    {
      name: "Reload",
      class: "text-blue-700",
    },
    {
      name: "Cancel",
      class: "text-rose-700",
    },
  ];
  return status[faker.datatype.number({ min: 0, max: status.length - 1 })];
};

const FetchWhs = () => {
  const whs = [
    { id: 0, title: "-", description: "-", class: "text-blue-600" },
    { id: 1, title: "COM", description: "Commercial", class: "text-rose-600" },
    { id: 2, title: "DOM", description: "Domestic", class: "text-green-600" },
    {
      id: 3,
      title: "NESC",
      description: "NESC Loading at shop.",
      class: "text-indigo-600",
    },
    { id: 4, title: "ICAM", description: "Export", class: "text-gray-600" },
  ];

  return whs;
};

const FetchPart = (limit = 15) => {
  let l = [faker.phone.number("7###-####-##"), faker.phone.number("7###-####"), faker.phone.number("18########")]
  let p = [];
  for (let i = 0; i < limit; i++) {
    p.push({
      id: i + 1,
      title: l[faker.datatype.number({min: 0, max: l.length - 1})],
      description: faker.name.fullName(),
      qty: faker.datatype.number({min: 1000, max: 99999}),
      ctn: faker.datatype.number({min:0, max: 999}),
      shelve: "-",
      pallet_no: "-"
    });
  }
  return p;
};

const RandomLastUpdate = () => DateTime(faker.date.between("2020-01-01T00:00:00.000Z", new Date().toISOString()).toISOString())

export {
  DateTime,
  DateOnly,
  ReceiveStatus,
  ReceiveCartonStatus,
  FakerEDI,
  EdiStatus,
  FetchWhs,
  FetchPart,
  RandomLastUpdate,
};
