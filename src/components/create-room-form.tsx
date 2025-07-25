import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateRoom } from "@/http/use-create-room";

const createRoomSchema = z.object({
    name: z.string().min(3, { message: 'Inclua no minimo 3 caracteres!' }),
    description: z.string(),
})

type CreateRoomFormData = z.infer<typeof createRoomSchema>

export function CreateRoomForm() {
    const { mutateAsync: createRoom } = useCreateRoom();

    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: '',
            description: '',
        }
    });

    async function handleCreateRoom({ name, description }: CreateRoomFormData) {
        await createRoom({ name, description })
        createRoomForm.reset();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar sala</CardTitle>
                <CardDescription>
                    Crie uma nova pergunta e deixe nossa I.A. te responder.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form 
                        className="flex flex-col gap-4"
                        onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} 
                    >
                        <FormField 
                            control={createRoomForm.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Nome da sala
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Nome da sala" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                );
                            }}
                        >

                        </FormField>

                        <FormField 
                            control={createRoomForm.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Descrição
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Descreva o seu problema"
                                            >

                                            </Textarea>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                );
                            }}
                        >

                        </FormField>

                        <Button className="w-full" type="submit">Criar Sala</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}