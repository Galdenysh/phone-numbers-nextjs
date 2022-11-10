// development constants
const dev = {
  baseUrl: "http://localhost:3000",
  selectOpt: [
    { id: 1, country: "rus", code: "+7" },
    { id: 2, country: "by", code: "+375" },
    { id: 3, country: "ua", code: "+380" },
  ],
};

// production constants
const prod = {
  baseUrl: "https://superkassa.herokuapp.com",
  selectOpt: [
    { id: 1, country: "rus", code: "+7" },
    { id: 2, country: "by", code: "+375" },
    { id: 3, country: "ua", code: "+380" },
  ],
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
