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

export interface AnakOption {
  nik: string;
  nama: string;
}

interface AnakComboboxProps {
  value?: string;
  onChange: (value: string) => void;
  options: AnakOption[] | undefined;
  disabled?: boolean;
  placeholder?: string;
}

export function AnakCombobox({
  value,
  onChange,
  options = [],
  disabled,
  placeholder = "Pilih anak...",
}: AnakComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedAnak = options.find((anak) => anak.nik === value);

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
          {selectedAnak
            ? `${selectedAnak.nama} (${selectedAnak.nik})`
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Cari nama atau NIK..." />
          <CommandList>
            <CommandEmpty>Anak tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {options.map((anak) => (
                <CommandItem
                  key={anak.nik}
                  value={anak.nama} // value is used for filtering by default in cmkd, but we can search by text content too?
                  // cmdk searches by 'value' prop AND text content usually.
                  // But to be safe, let's include NIK in value or keywords?
                  // Shadcn command item uses 'value' for search.
                  // If we want to search by NIK too, we should append it or rely on text content if configured?
                  // cmdk searches `value` attribute.
                  // So let's put "Name NIK" in value.
                  // But wait, `onSelect` takes the value.
                  // If I put "Name NIK" as value, onSelect gets "Name NIK".
                  // I need to capture the formatting.
                  onSelect={() => {
                    onChange(anak.nik);
                    setOpen(false);
                  }}
                  keywords={[anak.nik]} // Helper for search
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === anak.nik ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {anak.nama}{" "}
                  <span className="ml-2 text-muted-foreground text-xs">
                    ({anak.nik})
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
