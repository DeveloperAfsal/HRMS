import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Platform, TouchableOpacity, Image, Alert, RefreshControl, ActivityIndicator, TextInput } from "react-native";
import styles from "./style";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CalenderIcon from "../../../../../assets/EPK CRM Icons/Calendar.svg";
import DeleteIcon from "../../../../../assets/EPK CRM Icons/Delete.svg";
import { useSelector } from "react-redux";
import { Ash, Grey, White } from "../../../../../assets/Colors";


const AddEmployee = ({ navigation }) => {

    // data from redux store

    const { data } = useSelector((state) => state.login)

    // states.....

    const [load, setLoad] = useState(false);

    // basic details

    const [userEmpid, setUserEmpid] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(new Date());
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [email, setEmail] = useState('');

    //permenant address

    const [permanentAddress, setPermanentAddress] = useState('');
    const [permanentState, setPermanentState] = useState('');
    const [permanentCity, setPermanentCity] = useState('');
    const [permanentPincode, setPermanentPincode] = useState('');

    //current address

    const [currentAddress, setCurrentAddress] = useState('');
    const [currentState, setCurrentState] = useState('');
    const [currentCity, setCurrentCity] = useState('');
    const [currentPincode, setCurrentPincode] = useState('');

    //personal details

    const [fatherName, setFatherName] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState(new Date());
    const [maritalStatus, setMaritalStatus] = useState('');
    const [spouceName, setSpouceName] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [uanNumber, setUanNumber] = useState('');
    const [Netsalary, setNetSalary] = useState('');
    const [GrossSalary, setGrossSalary] = useState('');
    const [pfstatus, setPfStatus] = useState('');

    const [idProof, setIdProof] = useState('');

    // user create

    const [userRole, setUserRole] = useState('');
    const [userDepartment, setUserDepartment] = useState('');
    const [userDesigination, setUserDesigination] = useState('')
    const [userSuprevisor, setUserSuprevisor] = useState('');
    const [companyMailId, setCompanyMailId] = useState('');
    const [mailPassword, setMailPassword] = useState('');
    const [activeStatus, setActiveStatus] = useState('');

    //bank account details

    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [bankBranch, setBankBranch] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [accountType, setAccountType] = useState('');

    const [profileimage, setProfileimage] = useState('');
    const [proofimage, setProofimage] = useState('');

    const [refreshing, setRefreshing] = useState(false);

    const [errors, setErrors] = useState({

        // basic details

        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        whatsappNumber: '',
        email: '',

        //permenant address

        permanentAddress: '',
        permanentState: '',
        permanentCity: '',
        permanentPincode: '',

        //current address

        currentAddress: '',
        currentState: '',
        currentCity: '',
        currentPincode: '',

        //personal details

        fatherName: '',
        dateOfJoining: '',
        maritalStatus: '',
        panNumber: '',
        uanNumber: '',
        Netsalary: '',
        GrossSalary: '',
        pfstatus: '',

        idProof: '',

        // user create

        userRole: '',
        userDepartment: '',
        userDesigination: '',
        userSuprevisor: '',
        companyMailId: '',
        mailPassword: '',
        activeStatus: '',

        //bank account details

        bankAccountNumber: '',
        bankName: '',
        bankBranch: '',
        ifscCode: '',
        accountType: '',

    });

    // DOB picker

    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDob(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // DOJ picker

    const [showDatePicker1, setShowDatePicker1] = useState(false);

    const handleDateChange1 = (event, date) => {
        if (date !== undefined) {
            setDateOfJoining(date);
        }
        setShowDatePicker1(Platform.OS === 'ios');
    };

    const showDatepicker1 = () => {
        setShowDatePicker1(true);
    };

    //Image picker

    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedImage1, setSelectedImage1] = useState([]);

    const pickImage = async () => {
        try {
            const options = {
                mediaType: 'photo',
                selectionLimit: 1,
            };
            const result = await launchImageLibrary(options);

            if (!result.didCancel) {
                const images = result.assets ? result.assets : [result];
                for (const image of images) {
                    const response = await fetch(image.uri);
                    const blob = await response.blob();
                    if (blob.size > 1024 * 1024) {
                        Alert.alert("File size should be less than 1MB");
                    } else {
                        setSelectedImage(prevImages => [...prevImages, image.uri]);
                    }
                }
            }
        } catch (error) {
            console.log('Error picking images: ', error);
        }
    };

    const pickImage1 = async () => {
        try {
            const options = {
                mediaType: 'photo',
                selectionLimit: 1,
            };
            const result = await launchImageLibrary(options);

            if (!result.didCancel) {
                const images = result.assets ? result.assets : [result];
                for (const image of images) {
                    const response = await fetch(image.uri);
                    const blob = await response.blob();
                    if (blob.size > 1024 * 1024) {
                        Alert.alert("File size should be less than 1MB");
                    } else {
                        setSelectedImage1(prevImages => [...prevImages, image.uri]);
                    }
                }
            }
        } catch (error) {
            console.log('Error picking images: ', error);
        }
    };

    const deleteImage = (index) => {
        setSelectedImage(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const deleteImage1 = (index) => {
        setSelectedImage1(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const renderSelectedImage = () => {
        return selectedImage.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
                <TouchableOpacity onPress={() => deleteImage(index)}
                    style={styles.deleteButton}>
                    <DeleteIcon width={15} height={15} />
                </TouchableOpacity>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
        ));
    };

    const renderSelectedImage1 = () => {
        return selectedImage1.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
                <TouchableOpacity onPress={() => deleteImage1(index)}
                    style={styles.deleteButton}>
                    <DeleteIcon width={15} height={15} />
                </TouchableOpacity>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
        ));
    };

    //validations

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateInput = (input, fieldName, errorMessage) => {
        if (!input.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
        return true;
    };

    const validateMobileNumber = (input, fieldName, errorMessage) => {
        if (!/^\d{10}$/.test(input)) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
        return true;
    };

    const validateAddress = (input, fieldName, errorMessage) => {
        if (!input.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
            return false;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
        return true;
    };

    //picker

    const GenderArray = ['Select Gender', 'Male', 'Female'];
    const maritalStatusArray = ['Select Martial Status', 'Single', 'Married'];
    const StatusDropdown = ['Select Status', 'Active', 'In-Active'];
    const AccountTypeArray = ['Select Account Type', 'Savings', 'Current'];
    const pfstatusArray = ['Select PF Status', 'NA', 'Applicable'];

    // Handler

    const HandlesetGender = (itemValue) => {
        if (itemValue == GenderArray[0]) {
            setGender('');
        }
        else {
            setGender(itemValue)
        }
    }

    const HandlesetPF = (itemValue) => {
        if (itemValue == pfstatusArray[0]) {
            setPfStatus('');
        }
        else {
            setPfStatus(itemValue)
        }
    }

    const HandlesetMartialStatus = (itemValue) => {
        if (itemValue == maritalStatusArray[0]) {
            setMaritalStatus('');
        }
        else {
            setMaritalStatus(itemValue)
        }
    }

    const HandlesetStatus = (itemValue) => {
        if (itemValue == StatusDropdown[0]) {
            setActiveStatus('');
        }
        else {
            setActiveStatus(itemValue)
        }
    }

    const HandlesetAccType = (itemValue) => {
        if (itemValue == AccountTypeArray[0]) {
            setAccountType('');
        }
        else {
            setAccountType(itemValue)
        }
    }

    const HandlesetSupervisor = (itemValue) => {
        if (itemValue == userSupervisorDropdown[0]) {
            setUserSuprevisor('');
        }
        setUserSuprevisor(itemValue);
    }

    const HandlesetRole = (itemValue) => {
        if (itemValue == userRoleDropdown[0]) {
            setUserRole('');
        }
        else {
            setUserRole(itemValue)
        }
    }

    const HandlesetDepartment = (itemValue) => {
        if (itemValue == userDepartmentDropdown[0]) {
            setUserDepartment('');
        }
        else {
            setUserDepartment(itemValue)
        }
    }

    // Getting userRole from Backend

    const [userRoleDropdown, setUserRoleDropdown] = useState([]);

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/userroletype';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    }
                });
                const responsedata = response.data.data;
                const names = responsedata.map(user => ({ id: user.id, name: user.name }));
                // console.log(names, "userRoleDropdown")
                setUserRoleDropdown([{ "id": '', "name": "Select User Role" }, ...names]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Getting Department from Backend

    const [userDepartmentDropdown, setUserDepartmentDropdown] = useState([]);

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/department';
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    }
                });
                const responsedata = response.data.data;
                const deptnames = responsedata.map(user => ({ id: user.department_id, name: user.department_name }));
                // console.log(deptnames, "deptnames")
                setUserDepartmentDropdown([{ "id": '', "name": "Select User Department" }, ...deptnames]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Getting Suprevisor from Backend

    const [userSupervisorDropdown, setUserSupervisorDropdown] = useState([]);

    useEffect(() => {
        const apiUrl = `https://officeinteriorschennai.com/api/public/api/supervisorlist`;
        const fetchData = async () => {
            try {
                const response = await axios.post(apiUrl, {
                    supervisorlist: userDepartment
                }, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    }
                });
                const responsedata = response.data.data;
                const names = responsedata.map(user => ({ id: user.id, name: user.first_name }));
                setUserSupervisorDropdown([{ "id": '', "name": "Select Supervisor" }, ...names]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [userDepartment]);

    // Getting Emp id from backend 

    useEffect(() => {
        const apiUrl = 'https://officeinteriorschennai.com/api/public/api/epkemployeeid';
        const fetchData = async () => {
            try {
                // Fetching data
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });
                const responsedata = response.data.data;
                // console.log(responsedata, "epkempid")
                setUserEmpid(responsedata);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    //formatter

    const formattedDate =
        `${dob.getFullYear()}-${dob.getMonth() +
        1}-${dob.getDate()}`;

    const formattedTime =
        `${dob.getHours()}:${dob.getMinutes()}:${dob.getSeconds()}`;

    const formattedDate1 =
        `${dateOfJoining.getFullYear()}-${dateOfJoining.getMonth() +
        1}-${dateOfJoining.getDate()}`;

    const formattedTime1 =
        `${dateOfJoining.getHours()}:${dateOfJoining.getMinutes()}:${dateOfJoining.getSeconds()}`;

    const dobdate = `${formattedDate} ${formattedTime}`;

    const joiningdate = `${formattedDate1} ${formattedTime1}`;

    //handle refresh

    const handleRefresh = () => {

        setSelectedImage([]);
        setSelectedImage1([]);
        setFirstName('');
        setLastName('');
        setDob(new Date());
        setGender('');
        setPhoneNumber('');
        setWhatsappNumber('');
        setEmail('');


        setPermanentAddress('');
        setPermanentState('');
        setPermanentCity('');
        setPermanentPincode('');


        setCurrentAddress('');
        setCurrentState('');
        setCurrentCity('');
        setCurrentPincode('');


        setFatherName('');
        setPanNumber('');
        setUanNumber('');
        setIdProof('');
        setDateOfJoining(new Date());
        setMaritalStatus('');
        setSpouceName('');
        setNetSalary('');
        setGrossSalary('');
        setPfStatus('');

        setUserRole('');
        setUserDepartment('');
        setUserDesigination('');
        setUserSuprevisor('');
        setCompanyMailId('');
        setMailPassword('');
        setActiveStatus('');


        setBankAccountNumber('');
        setBankName('');
        setBankBranch('');
        setIfscCode('');
        setAccountType('');
    }

    //handle submit function

    const handleSubmit = async () => {

        setLoad(true);

        //validations

        const isValidFirstName = validateInput(firstName, 'firstName', 'First Name is required');
        const isValidLastName = validateInput(lastName, 'lastName', 'Last Name is required');
        const isValidGender = validateInput(gender, 'gender', 'Gender is required');
        const isValidPhoneNumber = validateMobileNumber(phoneNumber, 'phoneNumber', 'Please enter a valid Phone Number');
        const isValidWhatsappNumber = validateMobileNumber(whatsappNumber, 'whatsappNumber', 'Please enter a valid Whatsapp Number');
        const isValidEmailField = validateInput(email, 'email', 'Email is required') && isValidEmail(email);

        const isValidPermanentAddress = validateAddress(permanentAddress, 'permanentAddress', 'Permanent Address is required');
        const isValidPermanentState = validateInput(permanentState, 'permanentState', 'State is required');
        const isValidPermanentCity = validateInput(permanentCity, 'permanentCity', 'City is required');
        const isValidPermanentPincode = validateInput(permanentPincode, 'permanentPincode', 'Please enter a valid Pincode');

        const isValidCurrentAddress = validateAddress(currentAddress, 'currentAddress', 'Current Address is required');
        const isValidCurrentState = validateInput(currentState, 'currentState', 'State is required');
        const isValidCurrentCity = validateInput(currentCity, 'currentCity', 'City is required');
        const isValidCurrentPincode = validateInput(currentPincode, 'currentPincode', 'Please enter a valid Pincode');

        const isValidFatherName = validateInput(fatherName, 'fatherName', 'Father/Guardian Name is required');
        const isValidpanNumber = validateInput(panNumber, 'panNumber', 'Pan Number is required');
        const isValidNetsalary = validateInput(Netsalary, 'Netsalary', 'Netsalary is required');
        const isValidGrossSalary = validateInput(GrossSalary, 'GrossSalary', 'GrossSalary is required');
        const isValidPfstatus = validateInput(pfstatus.toString(), 'PF', 'PF is required');
        const isValidUanNumber = validateInput(uanNumber, 'uanNumber', 'UAN Number is required');
        const isValidMaritalStatus = validateInput(maritalStatus, 'maritalStatus', 'Marital Status is required');


        const isValidUserRole = validateInput(userRole, 'userRole', 'User Role is required');
        const isValidUserDepartment = validateInput(userDepartment, 'userDepartment', 'User Department is required');
        const isvalidUserDesigination = validateInput(userDesigination, 'userDesigination', 'User Desigination is required');
        const isValidUserSuprevisor = validateInput(userSuprevisor.toString(), 'userSuprevisor', 'User userSuprevisor is required');
        const isValidCompanyMailId = validateInput(companyMailId, 'companyMailId', 'Company Mail ID is required') && isValidEmail(companyMailId);
        const isValidMailPassword = validateInput(mailPassword, 'mailPassword', 'Mail Password is required');
        const isActiveStatus = validateAddress(activeStatus, 'activeStatus', 'Password is required');

        const isValidBankAccountNumber = validateInput(bankAccountNumber, 'bankAccountNumber', 'Please enter a valid Bank Account Number');
        const isValidBankName = validateInput(bankName, 'bankName', 'Bank Name is required');
        const isValidBankBranch = validateInput(bankBranch, 'bankBranch', 'Bank Branch is required');
        const isValidIfscCode = validateInput(ifscCode, 'ifscCode', 'IFSC Code is required');
        const isValidAccountType = validateInput(accountType, 'accountType', 'Account Type is required');

        if (isValidFirstName
            && isValidLastName && isValidGender && isValidPhoneNumber && isValidWhatsappNumber && isValidUserSuprevisor &&
            isValidEmailField && isValidFatherName && isValidMaritalStatus && isValidUserRole && isValidUserDepartment && isValidCompanyMailId &&
            isValidMailPassword && isValidBankAccountNumber && isValidBankName && isValidBankBranch && isValidIfscCode && isValidAccountType && isValidPermanentAddress &&
            isValidPermanentState && isValidPermanentCity && isValidPermanentPincode && isValidCurrentAddress && isValidCurrentState && isValidCurrentCity
            && isValidCurrentPincode && isActiveStatus && isValidpanNumber && isValidUanNumber && isValidPfstatus && isValidGrossSalary && isValidNetsalary && isvalidUserDesigination
            != false) {

            const formData = new FormData();

            //append data

            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('dob', dobdate);
            formData.append('gender', gender);
            formData.append('phone_no', phoneNumber);
            formData.append('whatsapp', whatsappNumber);
            formData.append('email', email);

            formData.append('address', permanentAddress);
            formData.append('state', permanentState);
            formData.append('city', permanentCity);
            formData.append('pincode', permanentPincode);

            formData.append('current_address', currentAddress);
            formData.append('current_state', currentState);
            formData.append('current_city', currentCity);
            formData.append('current_pincode', currentPincode);
            formData.append('designation', userDepartment);
            formData.append('department_name', userDesigination)

            formData.append('parents', fatherName);
            formData.append('marital_status', maritalStatus);
            formData.append('spouse_name', spouceName);
            formData.append('doj', joiningdate);
            formData.append('pan_number', panNumber);
            formData.append('uan_number', uanNumber);
            formData.append('emp_salary', Netsalary);
            formData.append('empgrosssalary', GrossSalary);
            formData.append('emppf', pfstatus);

            formData.append('bank_accountnumber', bankAccountNumber);
            formData.append('bank_name', bankName);
            formData.append('bank_branch', bankBranch);
            formData.append('ifsc_code', ifscCode);
            formData.append('ac_type', accountType);

            formData.append('user_id', companyMailId);
            formData.append('supervisor', userSuprevisor);
            formData.append('role', userRole);
            formData.append('password', mailPassword);
            formData.append('emp_status', activeStatus);
            formData.append('loginepkempid', data.userepkempid);

            if (selectedImage.length > 0) {
                selectedImage.map((selectedImage, index) => {
                    const imageUriParts = selectedImage.split('/');
                    const imageName = imageUriParts[imageUriParts.length - 1];
                    formData.append(`empimage`, {
                        uri: selectedImage,
                        name: imageName,
                        type: 'image/jpeg',
                    });
                });
            }
            else {
                formData.append('empimage', profileimage);
            }

            if (selectedImage1.length > 0) {
                selectedImage1.map((selectedImage, index) => {
                    const imageUriParts = selectedImage.split('/');
                    const imageName = imageUriParts[imageUriParts.length - 1];
                    formData.append(`proofs_image`, {
                        uri: selectedImage,
                        name: imageName,
                        type: 'image/jpeg',
                    });
                });
            } else {
                formData.append('proofs_image', proofimage);
            }

            try {
                const response = await fetch('https://officeinteriorschennai.com/api/public/api/mobileaddemployee', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${data.token}`
                    },
                    body: formData,
                });

                const responsedata = await response.json();
                console.log(responsedata, "appended")

                if (responsedata.status == 'success') {

                    setLoad(false);
                    navigation.navigate('Employee Detail')


                    setSelectedImage([]);
                    setSelectedImage1([]);
                    setFirstName('');
                    setLastName('');
                    setDob(new Date());
                    setGender('');
                    setPhoneNumber('');
                    setWhatsappNumber('');
                    setEmail('');

                    setPermanentAddress('');
                    setPermanentState('');
                    setPermanentCity('');
                    setPermanentPincode('');

                    setCurrentAddress('');
                    setCurrentState('');
                    setCurrentCity('');
                    setCurrentPincode('');

                    setFatherName('');
                    setPanNumber('');
                    setUanNumber('');
                    setIdProof('');
                    setDateOfJoining(new Date());
                    setMaritalStatus('');
                    setSpouceName('');
                    setNetSalary('');
                    setGrossSalary('');
                    setPfStatus('');
                    setUserRole('');
                    setUserDepartment('');
                    setUserDesigination('');
                    setUserSuprevisor('');
                    setActiveStatus('');
                    setCompanyMailId('');
                    setMailPassword('');
                    setBankAccountNumber('');
                    setBankName('');
                    setBankBranch('');
                    setIfscCode('');
                    setAccountType('');
                }
                else {
                    setLoad(false);
                    Alert.alert('Failed to add Employee')
                }
            } catch (error) {
                setLoad(false);
                console.log('reason', error)
                Alert.alert('Failed to add Employee')
            }
        }
        else {
            setLoad(false);
            console.log('last')
            Alert.alert('Please fill all the details')
        }
    }


    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>

                <View style={styles.container}>

                    <Text style={styles.heading}>Add Employee</Text>

                    <View style={styles.subContainer}>
                        <Text style={styles.subHeading}> - Basic Details </Text>

                        <View style={styles.input}>
                            <Text style={styles.userEmpid} >{userEmpid}</Text>
                        </View>


                        <View style={styles.imageProof}>
                            <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>
                                {renderSelectedImage()}
                            </ScrollView>
                            <TouchableOpacity onPress={pickImage} style={styles.addButton}>
                                <Text style={styles.text}>
                                    Upload Profile image
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            style={styles.input}
                            keyboardType="default"
                        />
                        {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}


                        <TextInput
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            style={styles.input}
                            keyboardType="default"
                        />
                        {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

                        <View>
                            <Text style={styles.dob}>Date of Birth :</Text>

                            <View style={styles.input}>

                                <Text onPress={showDatepicker}>
                                    <CalenderIcon width={15} height={15} color='#001860' />
                                    {dob.toDateString()} &nbsp;
                                </Text>

                                {showDatePicker && (
                                    <DateTimePicker
                                        value={dob}
                                        mode="date"
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}

                            </View>
                        </View>

                        <View style={[styles.input, styles.padding]}>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(itemValue) => {
                                    HandlesetGender(itemValue);
                                }}
                            >

                                {GenderArray.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} style={{ color: Grey }} />
                                ))}
                            </Picker>
                        </View>
                        {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}

                        <TextInput
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            style={styles.input}
                            keyboardType="phone-pad"
                        />
                        {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}

                        <TextInput
                            placeholder="Whatsapp Number"
                            value={whatsappNumber}
                            onChangeText={(text) => setWhatsappNumber(text)}
                            style={styles.input}
                            keyboardType="phone-pad"
                        />
                        {errors.whatsappNumber ? <Text style={styles.errorText}>{errors.whatsappNumber}</Text> : null}

                        <TextInput
                            placeholder="Personal Email id"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                            keyboardType="email-address"
                        />
                        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                    </View>



                    <View style={styles.subContainer}>
                        <Text style={styles.subHeading}> - Permanent Address</Text>
                        <TextInput
                            placeholder="Enter Permanent Address"
                            value={permanentAddress}
                            onChangeText={(text) => setPermanentAddress(text)}
                            style={styles.input}
                            multiline
                            numberOfLines={4}
                        />
                        {errors.permanentAddress ? <Text style={styles.errorText}>{errors.permanentAddress}</Text> : null}


                        <TextInput
                            placeholder="Enter State"
                            value={permanentState}
                            onChangeText={(text) => setPermanentState(text)}
                            style={styles.input}
                        />
                        {errors.permanentState ? <Text style={styles.errorText}>{errors.permanentState}</Text> : null}


                        <TextInput
                            placeholder="Enter City"
                            value={permanentCity}
                            onChangeText={(text) => setPermanentCity(text)}
                            style={styles.input}
                        />
                        {errors.permanentCity ? <Text style={styles.errorText}>{errors.permanentCity}</Text> : null}


                        <TextInput
                            placeholder="Enter Pincode"
                            value={permanentPincode}
                            onChangeText={(text) => setPermanentPincode(text)}
                            style={styles.input}
                            keyboardType="numeric"
                            maxLength={6}
                        />
                        {errors.permanentPincode ? <Text style={styles.errorText}>{errors.permanentPincode}</Text> : null}
                    </View>



                    <View style={styles.subContainer}>
                        <Text style={styles.subHeading}> - Current Address</Text>
                        <TextInput
                            placeholder="Enter Current Address"
                            value={currentAddress}
                            onChangeText={(text) => setCurrentAddress(text)}
                            style={styles.input}
                            multiline
                            numberOfLines={4}
                        />
                        {errors.currentAddress ? <Text style={styles.errorText}>{errors.currentAddress}</Text> : null}


                        <TextInput
                            placeholder="Enter State"
                            value={currentState}
                            onChangeText={(text) => setCurrentState(text)}
                            style={styles.input}
                        />
                        {errors.currentState ? <Text style={styles.errorText}>{errors.currentState}</Text> : null}


                        <TextInput
                            placeholder="Enter City"
                            value={currentCity}
                            onChangeText={(text) => setCurrentCity(text)}
                            style={styles.input}
                        />
                        {errors.currentCity ? <Text style={styles.errorText}>{errors.currentCity}</Text> : null}


                        <TextInput
                            placeholder="Enter Pincode"
                            value={currentPincode}
                            onChangeText={(text) => setCurrentPincode(text)}
                            style={styles.input}
                            keyboardType="numeric"
                            maxLength={6}
                        />
                        {errors.currentPincode ? <Text style={styles.errorText}>{errors.currentPincode}</Text> : null}
                    </View>


                    <View style={styles.subContainer}>
                        <Text style={styles.subHeading}> - Personal Details</Text>

                        <TextInput
                            placeholder="Enter Father/Guardian Name"
                            value={fatherName}
                            onChangeText={(text) => setFatherName(text)}
                            style={styles.input}
                        />
                        {errors.fatherName ? <Text style={styles.errorText}>{errors.fatherName}</Text> : null}


                        <View >
                            <ScrollView horizontal contentContainerStyle={styles.scrollViewContainer}>
                                {renderSelectedImage1()}
                            </ScrollView>
                            <TouchableOpacity onPress={pickImage1} style={styles.addButton}>
                                <Text style={styles.text}>
                                    Upload Profile image
                                </Text>
                            </TouchableOpacity>
                        </View>


                        <View>
                            <Text style={styles.doj}>Date of Joining :</Text>

                            <View style={styles.input} >
                                <Text onPress={showDatepicker1}>
                                    <CalenderIcon width={15} height={15} />
                                    {dateOfJoining.toDateString()} &nbsp;
                                </Text>
                                {showDatePicker1 && (
                                    <DateTimePicker
                                        value={dateOfJoining}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange1}
                                    />
                                )}
                            </View>
                        </View>


                        <View style={[styles.input, styles.padding]}>
                            <Picker
                                selectedValue={maritalStatus}
                                onValueChange={(itemValue) => {
                                    HandlesetMartialStatus(itemValue);
                                }}
                            >

                                {maritalStatusArray.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} style={{ color: Grey }} />
                                ))}
                            </Picker>
                        </View>
                        {errors.maritalStatus ? <Text style={styles.errorText}>{errors.maritalStatus}</Text> : null}

                        {maritalStatus == 'Married' ? <View>
                            <TextInput
                                placeholder="Enter Spouce Name"
                                value={spouceName}
                                onChangeText={(text) => setSpouceName(text)}
                                style={styles.input}
                            />
                            {errors.currentState ? <Text style={styles.errorText}>{errors.currentState}</Text> : null}
                        </View> : null}


                        <TextInput
                            placeholder="Enter PAN Number"
                            value={panNumber}
                            onChangeText={(text) => setPanNumber(text)}
                            style={styles.input}
                        />
                        {errors.panNumber ? <Text style={styles.errorText}>{errors.panNumber}</Text> : null}


                        <TextInput
                            placeholder="Enter UAN Number"
                            value={uanNumber}
                            onChangeText={(text) => setUanNumber(text)}
                            style={styles.input}
                        />
                        {errors.uanNumber ? <Text style={styles.errorText}>{errors.uanNumber}</Text> : null}

                        <TextInput
                            placeholder="Net Salary"
                            value={Netsalary}
                            onChangeText={(text) => setNetSalary(text)}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        {errors.Netsalary ? <Text style={styles.errorText}>{errors.Netsalary}</Text> : null}

                        <TextInput
                            placeholder="Gross Salary"
                            value={GrossSalary}
                            onChangeText={(text) => setGrossSalary(text)}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        {errors.GrossSalary ? <Text style={styles.errorText}>{errors.GrossSalary}</Text> : null}

                        <View style={[styles.input, styles.padding]}>
                            <Picker
                                selectedValue={pfstatus}
                                onValueChange={(itemValue) => {
                                    HandlesetPF(itemValue);
                                }}
                            >

                                {pfstatusArray.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} style={{ color: Grey }} />
                                ))}
                            </Picker></View>
                        {errors.pfstatus ? <Text style={styles.errorText}>{errors.pfstatus}</Text> : null}

                    </View>


                    <View style={styles.subContainer}>
                        <Text style={styles.subHeading}> - User Create</Text>


                        <View style={[styles.input, styles.padding]}>
                            <Picker
                                selectedValue={userRole}
                                onValueChange={(itemValue) => {
                                    HandlesetRole(itemValue);
                                }}
                            >

                                {userRoleDropdown.map((option) => (
                                    <Picker.Item key={option.id} label={option.name} value={option.id} style={{ color: Grey }} />
                                ))}
                            </Picker>
                        </View>
                        {errors.userRole ? <Text style={styles.errorText}>{errors.userRole}</Text> : null}


                        <View style={[styles.input, styles.padding]}>
                            <Picker
                                selectedValue={userDepartment}
                                onValueChange={(itemValue) => {
                                    HandlesetDepartment(itemValue);
                                }}
                            >

                                {userDepartmentDropdown.map((option) => (
                                    <Picker.Item key={option.id} label={option.name} value={option.id} style={{ color: Grey }} />
                                ))}
                            </Picker>
                        </View>
                        {errors.userDepartment ? <Text style={styles.errorText}>{errors.userDepartment}</Text> : null}



                        <TextInput
                            placeholder="User Desigination"
                            value={userDesigination}
                            onChangeText={(text) => setUserDesigination(text)}
                            style={styles.input}
                        />
                        {errors.userDesigination ? <Text style={styles.errorText}>{errors.userDesigination}</Text> : null}



                        <View style={[styles.input, styles.padding]}>
                            <Picker
                                selectedValue={userSuprevisor}
                                onValueChange={(itemValue) => {
                                    HandlesetSupervisor(itemValue);
                                }}
                            >

                                {userSupervisorDropdown.map((option) => (
                                    <Picker.Item key={option.id} label={option.name} value={option.id} style={{ color: Grey }} />
                                ))}
                            </Picker>
                        </View>
                        {errors.userSuprevisor ? <Text style={styles.errorText}>{errors.userSuprevisor}</Text> : null}


                        <TextInput
                            placeholder="Official Mail ID"
                            value={companyMailId}
                            onChangeText={(text) => setCompanyMailId(text)}
                            style={styles.input}
                            keyboardType="email-address"
                        />
                        {errors.companyMailId ? <Text style={styles.errorText}>{errors.companyMailId}</Text> : null}


                        <TextInput
                            placeholder="Official Mail Password"
                            value={mailPassword}
                            onChangeText={(text) => setMailPassword(text)}
                            style={styles.input}
                        />
                        {errors.mailPassword ? <Text style={styles.errorText}>{errors.mailPassword}</Text> : null}


                        <View style={[styles.input, styles.padding]}>
                            <Picker
                                selectedValue={activeStatus}
                                onValueChange={(itemValue) => {
                                    HandlesetStatus(itemValue);
                                }}
                            >
                                {StatusDropdown.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} style={{ color: Grey }} />
                                ))}
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.subContainer}>
                        <Text style={styles.subHeading}> - Bank Account Details</Text>

                        <TextInput
                            placeholder="Bank Account Number"
                            value={bankAccountNumber}
                            onChangeText={(text) => setBankAccountNumber(text)}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                        {errors.bankAccountNumber ? <Text style={styles.errorText}>{errors.bankAccountNumber}</Text> : null}

                        <TextInput
                            placeholder="Bank Name"
                            value={bankName}
                            onChangeText={(text) => setBankName(text)}
                            style={styles.input}
                        />
                        {errors.bankName ? <Text style={styles.errorText}>{errors.bankName}</Text> : null}

                        <TextInput
                            placeholder="Bank Branch"
                            value={bankBranch}
                            onChangeText={(text) => setBankBranch(text)}
                            style={styles.input}
                        />
                        {errors.bankBranch ? <Text style={styles.errorText}>{errors.bankBranch}</Text> : null}

                        <TextInput
                            placeholder="IFSC Code"
                            value={ifscCode}
                            onChangeText={(text) => setIfscCode(text)}
                            style={styles.input}
                        />
                        {errors.ifscCode ? <Text style={styles.errorText}>{errors.ifscCode}</Text> : null}


                        <View style={[styles.input, styles.padding]}>
                            <Picker
                                selectedValue={accountType}
                                onValueChange={(itemValue) => {
                                    HandlesetAccType(itemValue);
                                }}
                            >
                                {AccountTypeArray.map((option, index) => (
                                    <Picker.Item key={index} label={option} value={option} style={{ color: Grey }} />
                                ))}
                            </Picker>
                        </View>
                        {errors.accountType ? <Text style={styles.errorText}>{errors.accountType}</Text> : null}
                    </View>


                    <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
                        {
                            load ?
                                <ActivityIndicator
                                    color={White}
                                    size={"small"}
                                /> :
                                <Text style={{ color: White }}>
                                    Submit
                                </Text>
                        }
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </>
    )
}

export default React.memo(AddEmployee);