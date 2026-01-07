import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export interface OrtuOption {
  id: number;
  namaAyah: string | null;
  namaIbu: string | null;
  nik: string | null;
}

interface OrtuComboboxProps {
  value?: number;
  onChange: (value: number) => void;
  options: OrtuOption[] | undefined;
  disabled?: boolean;
  placeholder?: string;
}

export function OrtuCombobox({
  value,
  onChange,
  options = [],
  disabled,
  placeholder = "Pilih orang tua...",
}: OrtuComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOrtu = options.find((ortu) => ortu.id === value);

  const getOrtuLabel = (ortu: OrtuOption) => {
    if (ortu.namaAyah && ortu.namaIbu) {
      return `${ortu.namaAyah} / ${ortu.namaIbu}`;
    }
    return ortu.namaAyah || ortu.namaIbu || "Tanpa Nama";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          {selectedOrtu ? getOrtuLabel(selectedOrtu) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Cari nama orang tua..." />
          <CommandList>
            <CommandEmpty>Orang tua tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {options.map((ortu) => (
                <CommandItem
                  key={ortu.id}
                  value={getOrtuLabel(ortu)}
                  onSelect={() => {
                    onChange(ortu.id);
                    setOpen(false);
                  }}
                  keywords={[
                    ortu.nik || "",
                    ortu.namaAyah || "",
                    ortu.namaIbu || "",
                  ]}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === ortu.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {ortu.namaAyah || ortu.namaIbu || ortu.nik ? (
                    <>
                      {ortu.namaAyah} {ortu.namaAyah && ortu.namaIbu ? "/" : ""}{" "}
                      {ortu.namaIbu}
                    </>
                  ) : (
                    "Tanpa Nama"
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
