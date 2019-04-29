export const mealItems = [
  {
    description: "Quae culpa nisi labore id.",
    id: 1,
    image: "https://www.pexels.com/photo/burrito",
    isDeleted: "false",
    meal_type: "main",
    name: "Rice and Stew",
    timestamps:
    {
      created_at: "Fri, 21 Sep 2018 11:05:37 GMT",
      date_pretty: "September 21, 2018",
      date_pretty_short: "Sep 21, 2018",
      updated_at: "Fri, 21 Sep 2018 11:05:37 GMT"
    }
  },
  {
    description: "Quae culpa nisi labore id.",
    id: 2,
    image: "https://www.pexels.com/photo/burrito",
    isDeleted: "false",
    meal_type: "side",
    name: "Rice and Stew",
    timestamps:
    {
      created_at: "Fri, 21 Sep 2018 11:05:37 GMT",
      date_pretty: "September 21, 2018",
      date_pretty_short: "Sep 21, 2018",
      updated_at: "Fri, 21 Sep 2018 11:05:37 GMT"
    }
  },
  {
    description: "Quae culpa nisi labore id.",
    id: 2,
    image: "https://www.pexels.com/photo/burrito",
    isDeleted: "false",
    meal_type: "protein",
    name: "Fish",
    timestamps:
    {
      created_at: "Fri, 21 Sep 2018 11:05:37 GMT",
      date_pretty: "September 21, 2018",
      date_pretty_short: "Sep 21, 2018",
      updated_at: "Fri, 21 Sep 2018 11:05:37 GMT"
    }
  },
];

export const pagination = {};

export const mealRatings = {
  meta: {
    current_page: 0,
    next_page: 0,
    prev_page: 0,
    total_pages: 0,
    total_rows: 0
  },
  msg: "string",
  payload: {
    ratings: [
      {
        channel: "string",
        comment: "string",
        id: 0,
        isDeleted: false,
        rating: 0,
        timestamps: {
          created_at: "Wed, 21 Nov 2018 00:00:00 GMT",
          updated_at: "Wed, 21 Nov 2018 00:00:00 GMT"
        }
      }
    ]
  }
}