export const LevelsList = {
  data: () => {
    return {
      levelsList: [
        {
          text: "Select Level",
          value: null
        },
        {
          text: "Any Level",
          value: "any"
        },
        {
          text: "Running (Between min and max)",
          value: "run"
        },
        {
          text: "Above Minimum",
          value: "min"
        },
        {
          text: "Above Maximum",
          value: "max"
        },
        {
          text: "Low (Below Min)",
          value: "low"
        },
        {
          text: "High (Above Max)",
          value: "hig"
        }
      ]
    };
  }
};