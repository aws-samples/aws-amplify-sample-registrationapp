import React, { useEffect, useState } from "react";
import { Input, Label, Select, Button } from "@windmill/react-ui";

import { API } from 'aws-amplify';

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import RegistrationFormCard from "../components/Cards/RegistrationFormCard";
import ErrorLabel from "../components/Typography/ErrorLabel";

import Loading from "../assets/img/react_loading.gif";

function Registration() {
  // Fetching all the json files data to display in corresponding dropdown(select) boxes.
  let allCountriesList = require("../data/countries.json");
  let allJobRolesList = require("../data/jobroles.json");
  let allIndustriesList = require("../data/industries.json");
  let allCompanyTypesList = require("../data/company-types.json");
  let allCompanySizesList = require("../data/company-sizes.json");
  let allAwsUsageList = require("../data/aws-usage.json");

  //Form state variables to set/get data or error for HTML inputs
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [country, setCountry] = useState({});
  const [_state, set_State] = useState("");
  const [_stateErr, set_StateErr] = useState("");
  const [city, setCity] = useState("");
  const [cityErr, setCityErr] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [postalCodeErr, setPostalCodeErr] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [interest, setInterest] = useState("");
  const [interestErr, setInterestErr] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobTitleErr, setJobTitleErr] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameErr, setCompanyNameErr] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [awsUsage, setAwsUsage] = useState("");
  const [awsFreeDigitalTraining, setAwsFreeDigitalTraining] = useState(false);
  const [awsAiMlTraining, setAwsAiMlTraining] = useState(true);
  const [registering, setRegistering] = useState(false);

  //UseEffect function runs each time the page loads, so we set the default values to all the dropdown(select) boxes here.
  useEffect(() => {
    setCountry(allCountriesList[0]);
    setIndustry(allIndustriesList[0].name);
    setJobRole(allJobRolesList[0].name);
    setCompanyType(allCompanyTypesList[0].name);
    setCompanySize(allCompanySizesList[0].name);
    setAwsUsage(allAwsUsageList[0].name);
  }, [allCountriesList, allIndustriesList, allJobRolesList, allCompanyTypesList, allCompanySizesList, allAwsUsageList]);

  //Function for handling changes in Country dropdown(select) box and set the selected data to "country" variable created in line 27.
  const handleCountryChange = (e) => {
    e.preventDefault();

    setCountry(allCountriesList[e.target.selectedIndex]);
  }

  //Function for handling changes in JobRole dropdown(select) box and set the selected data to "jobRole" variable created in line 42.
  const handleJobRoleChange = (e) => {
    e.preventDefault();

    setJobRole(allJobRolesList[e.target.selectedIndex].name);
  }

  //Function for handling changes in Industry dropdown(select) box and set the selected data to "industry" variable created in line 43.
  const handleIndustryChange = (e) => {
    e.preventDefault();

    setIndustry(allIndustriesList[e.target.selectedIndex].name);
  }
  //Function for handling changes in CompanyType dropdown(select) box and set the selected data to "companyType" variable created in line 44.
  const handleCompanyTypeChange = (e) => {
    e.preventDefault();

    setCompanyType(allCompanyTypesList[e.target.selectedIndex].name);
  }

  //Function for handling changes in CompanySize dropdown(select) box and set the selected data to "companySize" variable created in line 45.
  const handleCompanySizeChange = (e) => {
    e.preventDefault();

    setCompanySize(allCompanySizesList[e.target.selectedIndex].name);
  }

  //Function for handling changes in AwsUsage dropdown(select) box and set the selected data to "awsUsage" variable created in line 46.
  const handleAwsUsageChange = (e) => {
    e.preventDefault();

    setAwsUsage(allAwsUsageList[e.target.selectedIndex].name);
  }

  //Function for handling changes in Interest radio group (Personal/Business) and set the selected data to "interest" variable created in line 36.
  const handleInterestChange = (e) => {
    e.preventDefault();
    setInterest(e.target.value);
    setInterestErr("");
  }

  //Regular Expression constants for validating user inputs
  const validEmailRegex = RegExp(    
    /^([\w.]+(([+]{1})*[\w.]+){1}@(?!yahoo\.)(?!hotmail\.)([\w-]+.)+[\w-]{2,4})?$/i
  );
  const validNameRegex = RegExp(
    /^[a-zA-Z0-9 ]+$/i
  );
  const validPostalCodeRegex = RegExp(
    /^[0-9]{5,6}$/i
  );
  const validPhoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i
  );

  //Function for handling all the input box data changes for the entire form in real time as the user enters data.
  //All the required form validation happens here.
  //Based on the form validation, the Register button is enabled/disabled
  const handleInputChange = (e) => {
    e.preventDefault();

    let _value = e.target.value;
    let _name = e.target.name;

    var errorMsg = "";

    switch (_name) {
      case "email":
        if (_value.length <= 0) {
          errorMsg = "Email cannot be left blank";
        } else if (!validEmailRegex.test(_value)) {
          errorMsg = "Invalid Email ID";
        } else {
          errorMsg = "";
        }
        setEmail(_value);
        setEmailErr(errorMsg);
        break;
      case "firstname":
        if (_value.length <= 0) {
          errorMsg = "First Name cannot be left blank";
        } else if (!validNameRegex.test(_value)) {
          errorMsg = "Invalid Name character"
        } else {
          errorMsg = "";
        }
        setFirstName(_value);
        setFirstNameErr(errorMsg);
        break;
      case "lastname":
        if (_value.length <= 0) {
          errorMsg = "Last Name cannot be left blank";
        } else if (!validNameRegex.test(_value)) {
          errorMsg = "Invalid Name character"
        } else {
          errorMsg = "";
        }
        setLastName(_value);
        setLastNameErr(errorMsg);
        break;
      case "state":
        if (_value.length <= 0) {
          errorMsg = "State cannot be left blank";
        } else if (!validNameRegex.test(_value)) {
          errorMsg = "Invalid State character"
        } else {
          errorMsg = "";
        }
        set_State(_value);
        set_StateErr(errorMsg);
        break;
      case "city":
        if (_value.length <= 0) {
          errorMsg = "City cannot be left blank";
        } else if (!validNameRegex.test(_value)) {
          errorMsg = "Invalid City character"
        } else {
          errorMsg = "";
        }
        setCity(_value);
        setCityErr(errorMsg);
        break;

      case "phone":
        if (_value.length <= 0) {
          errorMsg = "Phone number cannot be left blank";
        } else if (!validPhoneRegex.test(_value)) {
          errorMsg = "Invalid Phone Number"
        } else {
          errorMsg = "";
        }
        setPhone(_value);
        setPhoneErr(errorMsg);
        break;
      case "jobtitle":
        if (_value.length <= 0) {
          errorMsg = "Job Title cannot be left blank";
        } else if (!validNameRegex.test(_value)) {
          errorMsg = "Invalid Job Title character"
        } else {
          errorMsg = "";
        }
        setJobTitle(_value);
        setJobTitleErr(errorMsg);
        break;
      case "postalcode":
        if (_value.length <= 0) {
          errorMsg = "Postal Code cannot be left blank";
        } else if (!validPostalCodeRegex.test(_value)) {
          errorMsg = "Invalid Postal Code"
        } else {
          errorMsg = "";
        }
        setPostalCode(_value);
        setPostalCodeErr(errorMsg);
        break;
      case "companyname":
        if (_value.length <= 0) {
          errorMsg = "Company Name cannot be left blank";
        } else if (!validNameRegex.test(_value)) {
          errorMsg = "Invalid Company Name character"
        } else {
          errorMsg = "";
        }
        setCompanyName(_value);
        setCompanyNameErr(errorMsg);
        break;
      default:
        break;
    }
  }

  //Functions for validate form before submitting to API
  function validForm() {
    if (firstName === "") {
      setFirstNameErr("Name cannot be left blank");
      return false;
    }
    if (lastName === "") {
      setLastNameErr("Last Name cannot be left blank");
      return false;
    }
    if (email === "") {
      setEmailErr("Email cannot be left blank");
      return false;
    }
    if (_state === "") {
      set_StateErr("State Name cannot be left blank");
      return false;
    }
    if (city === "") {
      setCityErr("City Name cannot be left blank");
      return false;
    }
    if (postalCode === "") {
      setPostalCodeErr("PostalCode cannot be left blank");
      return false;
    }
    if (phone === "") {
      setPhoneErr("Phone Number cannot be left blank");
      return false;
    }
    if (jobTitle === "") {
      setJobTitleErr("Job Title cannot be left blank");
      return false;
    }
    if (companyName === "") {
      setCompanyNameErr("Company Name cannot be left blank");
      return false;
    }
    if (interest === "") {
      setInterestErr("Select any one of the above");
      return false;
    }
    return true;
  }

  //Function to save the entered data from registration form to DynamoDB via REST API
  async function register(e) {
    e.preventDefault();

    if (validForm()) {
      setRegistering(true);
      const data = {
        body: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          countryCode: country.code,
          countryName: country.name,
          state: _state,
          city: city,
          postalCode: postalCode,
          phoneNumber: phone,
          career: {
            interestFor: interest,
            jobTitle: jobTitle,
            companyName: companyName,
            jobRole: jobRole,
            industry: industry,
            companyType: companyType,
            companySize: companySize,
            awsUsage: awsUsage,
          },
          // awsFreeDigitalTraining: awsFreeDigitalTraining,
          awsAiMlTraining: awsAiMlTraining,
          createdAt: new Date().toISOString()
        }
      };

      const reqInit = {
        queryStringParameters: {
          email: email,
        },
      };
      const existingUser = await API.get('registrationapi', '/users', reqInit);
      console.log(existingUser);

      if (existingUser['error'] !== undefined) {
        alert("Error in registering, please try again later");
        setRegistering(false);
      } else {
        if (existingUser.length > 0) {
          alert("Email already registered");
          setRegistering(false);
        } else {
          const apiData = await API.post('registrationapi', '/users', data);

          if (apiData["success"] !== undefined) {
            window.location.href = "/app/success";
          } else {
            alert("Unable to register");
            setRegistering(false);
          }
        }
      }
    } else {
      alert("One or more fields are invalid");
    }
  }

  //The UI of the Registration page is entered inside return block
  return (
    <>
      {/* Page Title */}
      <PageTitle>Registration</PageTitle>

      {/* Registration Card starts */}
      <RegistrationFormCard>

        {/* Contact Information Section starts */}
        <SectionTitle>Contact information</SectionTitle>
        <Label>
          <span>First Name *</span>
          <Input key="firstname" className="mt-1" name="firstname" onChange={(e) => handleInputChange(e)} disabled={registering} />
        </Label>
        <ErrorLabel>{firstNameErr}</ErrorLabel>
        <Label className="mt-6">
          <span>Last Name *</span>
          <Input key="lastname" className="mt-1" name="lastname" onChange={(e) => handleInputChange(e)} disabled={registering} />
        </Label>
        <ErrorLabel>{lastNameErr}</ErrorLabel>
        <Label className="mt-6">
          <span>Email *</span>
          <Input key="email" className="mt-1" name="email" onChange={(e) => handleInputChange(e)} disabled={registering} />
        </Label>
        <ErrorLabel>{emailErr}</ErrorLabel>
        <Label className="mt-6">
          <span>Country/Region*</span>
          <Select key="country" className="mt-1" onChange={(e) => handleCountryChange(e)} disabled={registering}>
            {allCountriesList !== undefined && allCountriesList.length > 0
              ?
              allCountriesList.map(country =>
                <option key={country.code} id={country.code} value={country.name}>{country.name}</option>
              )
              :
              ""
            }
          </Select>
        </Label>
        <Label className="mt-6">
          <span>State*</span>
          <Input key="state" className="mt-1" name="state" onChange={(e) => handleInputChange(e)} disabled={registering} />
        </Label>
        <ErrorLabel>{_stateErr}</ErrorLabel>
        <Label className="mt-6">
          <span>City*</span>
          <Input key="city" className="mt-1" name="city" onChange={(e) => handleInputChange(e)} disabled={registering} />
        </Label>
        <ErrorLabel>{cityErr}</ErrorLabel>
        <Label className="mt-6">
          <span>Postal Code *</span>
          <Input key="postalcode" className="mt-1" name="postalcode" onChange={(e) => handleInputChange(e)} disabled={registering} />
        </Label>
        <ErrorLabel>{postalCodeErr}</ErrorLabel>
        <Label className="mt-6">
          <span>Phone Number *</span>
          <Input key="phone" className="mt-1" name="phone" onChange={(e) => handleInputChange(e)} disabled={registering} />
        </Label>
        <ErrorLabel>{phoneErr}</ErrorLabel>
        {/* Contact Information Section ends */}

        {/* Career Information Section starts */}
        <SectionTitle>Tell us a bit about you</SectionTitle>
        <div className="flex mt-4">
          <Label className="my-auto">My interest is for</Label>
          <div className="mt-2 my-auto">
            <Label radio className="ml-4">
              <Input key="personal" type="radio" value="Personal" checked={interest === "Personal"}
                onChange={(e) => handleInterestChange(e)} disabled={registering} />
              <span className="ml-2">Personal</span>
            </Label>
            <Label className="ml-6" radio>
              <Input key="business" type="radio" value="Business" checked={interest === "Business"}
                onChange={(e) => handleInterestChange(e)} disabled={registering} />
              <span className="ml-2">Business</span>
            </Label>
          </div>
        </div>
        <ErrorLabel>{interestErr}</ErrorLabel>
        <Label className="mt-6">
          <span>Job Title *</span>
          <Input key="jobtitle" className="mt-1" name="jobtitle" onChange={(e) => handleInputChange(e)} disabled={registering} />
        </Label>
        <ErrorLabel>{jobTitleErr}</ErrorLabel>
        <Label className="mt-6">
          <span>Company Name *</span>
          <Input key="company" className="mt-1" name="companyname" onChange={(e) => handleInputChange(e)} disabled={registering} />
        </Label>
        <ErrorLabel>{companyNameErr}</ErrorLabel>
        <Label className="mt-6">
          <span>Job Role*</span>
          <Select key="jobrole" className="mt-1" onChange={(e) => handleJobRoleChange(e)} disabled={registering}>
            {allJobRolesList !== undefined && allJobRolesList.length > 0
              ?
              allJobRolesList.map((jobRole, index) =>
                <option key={index} value={jobRole.name}>{jobRole.name}</option>
              )
              :
              ""
            }
          </Select>
        </Label>
        <Label className="mt-6">
          <span>Industry*</span>
          <Select key="industry" className="mt-1" onChange={(e) => handleIndustryChange(e)} disabled={registering}>
            {allIndustriesList !== undefined && allIndustriesList.length > 0
              ?
              allIndustriesList.map((industry, index) =>
                <option key={index} value={industry.name}>{industry.name}</option>
              )
              :
              ""
            }
          </Select>
        </Label>
        <Label className="mt-6">
          <span>Company Type*</span>
          <Select key="companytype" className="mt-1" onChange={(e) => handleCompanyTypeChange(e)} disabled={registering}>
            {allCompanyTypesList !== undefined && allCompanyTypesList.length > 0
              ?
              allCompanyTypesList.map((companyType, index) =>
                <option key={index} value={companyType.name}>{companyType.name}</option>
              )
              :
              ""
            }
          </Select>
        </Label>
        <Label className="mt-6">
          <span>Company Size*</span>
          <Select key="companysize" className="mt-1" onChange={(e) => handleCompanySizeChange(e)} disabled={registering}>
            {allCompanySizesList !== undefined && allCompanySizesList.length > 0
              ?
              allCompanySizesList.map((companySize, index) =>
                <option key={index} value={companySize.name}>{companySize.name}</option>
              )
              :
              ""
            }
          </Select>
        </Label>
        <Label className="mt-6">
          <span>Level of Aws Usage *</span>
          <Select key="awsusage" className="mt-1" onChange={(e) => handleAwsUsageChange(e)} disabled={registering}>
            {allAwsUsageList !== undefined && allAwsUsageList.length > 0
              ?
              allAwsUsageList.map((awsUsage, index) =>
                <option key={index} value={awsUsage.name}>{awsUsage.name}</option>
              )
              :
              ""
            }
          </Select>
        </Label>
        {/* Career Information Section ends */}

        {/* Interest Section starts */}
        <SectionTitle>Register your interest</SectionTitle>
        <Label className="mt-4" check>
          <Input key="aimltraining" type="checkbox" onChange={(e) => setAwsAiMlTraining(e.target.checked)} disabled={registering} checked />
          <span className="ml-2">
            Register your interest for
            <span className="my-6 ml-2 text-sm font-bold dark:text-gray-200">
              AWS AI/ML Training
            </span>
          </span>
        </Label>
        <br />
        <Label className="mt-4" check>
          <span className="ml-1">
            By registering, you agree to the
            <span className="my-6 ml-2 text-sm font-bold dark:text-gray-200">AWS Event Terms and Conditions</span>
            &nbsp;and the
            <span className="my-6 ml-2 text-sm font-bold dark:text-gray-200">AWS Code of Conduct.</span>
          </span>
        </Label>
        {/* Interest Section ends */}

        <br />

        {registering
          ?
          <img className="mt-8 mb-4" width="30" height="30" src={Loading} alt="" />
          :
          <Button key="register" className="mt-8 mb-4" size="large" onClick={(e) => register(e)}>Register</Button>
        }
      </RegistrationFormCard>
      {/* Registration Card ends */}
    </>
  );
}

export default Registration;