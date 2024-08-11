import { CareerAppLogo } from "@icon/CareerAppLogo";
import {
  Anchor,
  Box,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  useMantineColorScheme,
  useMantineTheme,
  getGradient,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { SchemaUtils } from "@util/SchemaUtils";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().trim().min(1, SchemaUtils.message.nonempty),
  password: z.string().trim().min(1, SchemaUtils.message.nonempty),
});

type FormValues = z.infer<typeof formSchema>;
const initialFormValues: FormValues = {
  username: "",
  password: "",
};

export function LoginPage() {
  //const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: initialFormValues,
    validate: zodResolver(formSchema),
  });
  return (
    <Box
      //bg={colorScheme === "dark" ? theme.colors.dark[6] : theme.colors?.gray[1]}
      bg={getGradient(
        {
          deg: 180,
          from: theme.colors.green[9],
          to: theme.colors.green[1],
        },
        theme
      )}
      mih="100vh"
    >
      <Container size={420} pt="20vh" pb="2rem">
        <Paper withBorder shadow="md" radius={"md"} p={30}>
          <Stack justify="center" align="center">
            <CareerAppLogo />
          </Stack>
          <form onSubmit={() => {}}>
            <TextInput
              withAsterisk
              label="Tên đăng nhập"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              withAsterisk
              label="Mật khẩu"
              mt="md"
              {...form.getInputProps("password")}
            />
            <Group justify="end" mt="sm">
              <Anchor component="button" size="sm" c={theme.colors.blue[6]}>
                Quên mật khẩu?
              </Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl">
              Đăng nhập
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
