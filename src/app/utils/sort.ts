import numeral from "numeral"

// sort data to asc
export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = stat => 
{return stat ? `+${numeral(stat).format("0.0a")}` : "+0";}

