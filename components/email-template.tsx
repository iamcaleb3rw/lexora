import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import Logo from "@/public/logo.svg";

interface EmailTemplateProps {
  userFirstname?: string;
  otp?: string;
}

export const EmailTemplate = ({ userFirstname, otp }: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Lexora sent your OTP Code</Preview>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>Your requested one time password (OTP) is:</Text>
            <Text style={code}>{otp}</Text>
            <Text style={text}>
              If you did&apos;t request this code, just ignore and delete this
              message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
            </Text>
            <Text style={text}>Happy Research!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const code = {
  backgrounColor: "#e5e5e5",
  border: "3px solid #8b5cf6",
  padding: "20px",
  fontSize: "20px",
  color: "black",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
