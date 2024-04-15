import { StyleSheet } from "react-native";
import { Black, PrimaryAshPurple, PrimaryBlue, PrimaryGreen, PrimaryPurple, SecondaryAshPurple, White } from "../../../../../../assets/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
    backgroundColor: SecondaryAshPurple,
    padding: 15,
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 40,
    marginRight: 10,
  },
  companyDetails: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 50,
  },
  companyName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  SalarySlip: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    fontSize: 10,
  },
  employeeDetails: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  employeeInfo: {
    flex: 1,
  },
  singleLine: {
    fontSize: 10,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: Black,
    marginBottom: 10,
  },
  dataTable: {
    width: '100%',
    marginBottom: 20,
  },
  tablecontainer: {
    flex: 1,
    backgroundColor: White,
    marginTop: 5,
    marginBottom: 10
  },

  tableHeader1: {
    height: 25,
    backgroundColor: PrimaryAshPurple,
  },
  tableHeader: {
    height: 25,
    backgroundColor: PrimaryAshPurple
  },
  tableHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    color: PrimaryBlue
  },
  tableRow: {
    height: 35,
    backgroundColor: SecondaryAshPurple
  },
  tableRowText: {
    textAlign: 'center',
    fontSize: 10
  },
  totalNetPayableText: {
    fontSize: 10,
    padding: 10,
    fontWeight: '500',
    backgroundColor: PrimaryBlue,
    color: White
  },
  buttonstyles: {
    width: 200,
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: White,
    borderColor: PrimaryPurple,
    borderWidth: 1,
    alignContent: "center",
    marginBottom: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: PrimaryPurple,
    fontWeight: '400'
  }
});

export default styles;