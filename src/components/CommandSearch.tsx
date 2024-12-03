import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";

interface ICommandProps {
  commands: { value: string; label: string }[];
}

export default function CommandSearch({ commands }: ICommandProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
  };

  const filteredCommands = Array.isArray(commands)
    ? commands.filter((command) =>
        command.label.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : [];
  console.log("filteredCommands", filteredCommands);
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Type a command or search..."
        onValueChange={handleValueChange}
      />
      {
        <CommandList>
          {open &&
            filteredCommands.length > 0 &&
            filteredCommands.map((command) => (
              <CommandItem key={command.value} value={command.value}>
                {command.label}
              </CommandItem>
            ))}
        </CommandList>
      }
    </Command>
  );
}
