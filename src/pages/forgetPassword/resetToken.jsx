import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ResetToken = () => {
  return (
    <View>
      <Text>ResetToken</Text>
    </View>
  );
};

export default ResetToken;

const styles = StyleSheet.create({});

// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Heading } from "@chakra-ui/layout";
// import axios from "axios";
// import { useFormik } from "formik";
// import { useRouter } from "next/router";
// import React from "react";
// import { BASE_URL } from "../../../utils/baseUrl";
// import { ReasetPasssword } from "../../api";
// function ResetToken() {
//   const router = useRouter();
//   const { resetToken } = router.query;
//   const formik = useFormik({
//     initialValues: {
//       password: "",
//       confirmPassword: "",
//     },
//     onSubmit: async (values, { resetForm }) => {
//       const { password, confirmPassword } = values;
//       //(values);

//       if (password.toString() !== confirmPassword.toString()) {
//         alert("Password do not match");
//         return;
//       }
//       await ReasetPasssword(password);
//       resetForm();
//     },
//   });

//   return (
//     <Box
//       d="flex"
//       justifyContent="center"
//       alignItems="center"
//       flexDirection="column"
//       gridGap="5"
//       p="4"
//       boxShadow="lg"
//       backgroundColor="#fff"
//     >
//       <Box
//         d="flex"
//         alignItems="center"
//         justifyContent="space-between"
//         textAlign="center"
//       >
//         <Heading as="h4" size="md" textShadow="1px 1px #aaa">
//           Reset your password
//         </Heading>
//       </Box>
//       <form
//         className="flex flex-col gap-4"
//         onSubmit={formik.handleSubmit}
//         style={{ width: "100%" }}
//       >
//         <FormControl id="password">
//           <FormLabel textAlign="center">Password</FormLabel>
//           <Input
//             type="password"
//             backgroundColor="#bbb"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//           />
//         </FormControl>
//         <FormControl id="confirmPassword">
//           <FormLabel textAlign="center">Confirm Password</FormLabel>
//           <Input
//             type="password"
//             backgroundColor="#bbb"
//             value={formik.values.confirmPassword}
//             onChange={formik.handleChange}
//           />
//         </FormControl>
//         <Button colorScheme="blue" type="submit">
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// }

// export default ResetToken;
