"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { useEffect, forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Represents an option in the selector.
 */
export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** Fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

/**
 * Grouped options by a specific key.
 */
interface GroupOption {
  [key: string]: Option[];
}

/**
 * Props for the MultipleSelector component.
 */
interface MultipleSelectorProps {
  value?: Option[];
  defaultOptions?: Option[];
  options?: Option[];
  placeholder?: string;
  loadingIndicator?: React.ReactNode;
  emptyIndicator?: React.ReactNode;
  delay?: number;
  triggerSearchOnFocus?: boolean;
  onSearch?: (value: string) => Promise<Option[]>;
  onChange?: (options: Option[]) => void;
  maxSelected?: number;
  onMaxSelected?: (maxLimit: number) => void;
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  selectFirstItem?: boolean;
  creatable?: boolean;
  /** Optionally disable removing the last selected option on Backspace. */
  disableBackspaceRemove?: boolean;
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<"input">,
    "value" | "placeholder" | "disabled"
  >;
}

/**
 * Ref interface for exposing selected values and input element.
 */
export interface MultipleSelectorRef {
  selectedValue: Option[];
  input: HTMLInputElement;
}

/**
 * Custom hook to debounce a value.
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Transforms an array of options into grouped options.
 * @param options - Array of options.
 * @param groupBy - Key to group options by.
 * @returns Grouped options.
 */
function transToGroupOption(options: Option[], groupBy?: string): GroupOption {
  if (options.length === 0) return {};
  if (!groupBy) return { "": options };

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || "";
    groupOption[key] = groupOption[key] || [];
    groupOption[key].push(option);
  });
  return groupOption;
}

/**
 * Removes already picked options from the group.
 * @param groupOption - The grouped options.
 * @param picked - The selected options.
 * @returns Updated grouped options.
 */
function removePickedOption(
  groupOption: GroupOption,
  picked: Option[]
): GroupOption {
  const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption;
  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter(
      (val) => !picked.some((p) => p.value === val.value)
    );
  }
  return cloneOption;
}

/**
 * Custom CommandEmpty component to handle empty states correctly.
 */
const CommandEmpty = forwardRef<HTMLDivElement, React.ComponentProps<"input">>(
  ({ ...props }, forwardedRef) => {
    const render = useCommandState((state) => state.filtered.count === 0);
    if (!render) return null;

    return (
      <div
        ref={forwardedRef}
        className={cn("py-6 text-center text-sm")}
        cmdk-empty=""
        role="presentation"
        {...props}
      />
    );
  }
);
CommandEmpty.displayName = "CommandEmpty";

const MultipleSelector = forwardRef<MultipleSelectorRef, MultipleSelectorProps>(
  (
    {
      value,
      onChange,
      placeholder,
      defaultOptions: arrayDefaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      loadingIndicator = "Loading...",
      emptyIndicator = "No results found.",
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      disableBackspaceRemove = false,
      commandProps,
      inputProps,
    }: MultipleSelectorProps,
    ref: React.Ref<MultipleSelectorRef>
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [selected, setSelected] = React.useState<Option[]>(value || []);
    const [options, setOptions] = React.useState<GroupOption>(
      transToGroupOption(arrayDefaultOptions, groupBy)
    );
    const [inputValue, setInputValue] = React.useState("");
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current as HTMLInputElement,
      }),
      [selected]
    );

    const handleUnselect = React.useCallback(
      (option: Option) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        setSelected(newOptions);
        onChange?.(newOptions);
      },
      [selected, onChange]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (!input) return;

        if (
          (e.key === "Delete" || e.key === "Backspace") &&
          !disableBackspaceRemove
        ) {
          if (input.value === "" && selected.length > 0) {
            handleUnselect(selected[selected.length - 1]);
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      },
      [selected, handleUnselect, disableBackspaceRemove]
    );

    useEffect(() => {
      if (value) setSelected(value);
    }, [value]);

    useEffect(() => {
      if (!arrayOptions || onSearch) return;
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
    }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      };

      const exec = async () => {
        if (!onSearch || !open) return;
        if (triggerSearchOnFocus || debouncedSearchTerm) await doSearch();
      };

      void exec();
    }, [debouncedSearchTerm, open, onSearch, triggerSearchOnFocus, groupBy]);

    const CreatableItem = () => {
      if (!creatable || inputValue.length === 0) return undefined;
      if (onSearch && (isLoading || debouncedSearchTerm.length === 0))
        return undefined;

      return (
        //@ts-ignore
        <CommandItem
          value={inputValue}
          className="cursor-pointer"
          onMouseDown={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value: string) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length);
              return;
            }
            setInputValue("");
            const newOptions = [...selected, { value, label: value }];
            setSelected(newOptions);
            onChange?.(newOptions);
          }}
        >{`Create "${inputValue}"`}</CommandItem>
      );
    };

    const EmptyItem = React.useCallback(() => {
      if (!emptyIndicator) return undefined;
      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          //@ts-ignore
          <CommandItem value="-" disabled>
            {emptyIndicator}
          </CommandItem>
        );
      }
      return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
    }, [creatable, emptyIndicator, onSearch, options]);

    const selectables = React.useMemo(
      () => removePickedOption(options, selected),
      [options, selected]
    );

    const commandFilter = React.useCallback(() => {
      //@ts-ignore
      if (commandProps?.filter) return commandProps.filter;
      if (creatable) {
        return (value: string, search: string) =>
          value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
      }
      return undefined;
      //@ts-ignore
    }, [creatable, commandProps?.filter]);

    return (
      //@ts-ignore
      <Command
        {...commandProps}
        onKeyDown={(e) => {
          //@ts-ignore
          handleKeyDown(e); //@ts-ignore
          commandProps?.onKeyDown?.(e);
        }}
        className={cn(
          "overflow-visible bg-transparent", //@ts-ignore
          commandProps?.className
        )} //@ts-ignore
        shouldFilter={commandProps?.shouldFilter ?? !onSearch}
        filter={commandFilter()}
      >
        <div
          className={cn(
            "group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected.map((option) => (
              <Badge
                key={option.value}
                className={cn(
                  "data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground",
                  "data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground",
                  badgeClassName
                )}
                data-fixed={option.fixed}
                data-disabled={disabled}
              >
                {option.label}
                <button
                  className={cn(
                    "ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    (disabled || option.fixed) && "hidden"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUnselect(option);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            //@ts-ignore
            <CommandPrimitive.Input
              {...inputProps}
              ref={inputRef}
              value={inputValue}
              disabled={disabled}
              onValueChange={(value) => {
                setInputValue(value); //@ts-ignore
                inputProps?.onValueChange?.(value);
              }}
              onBlur={(event) => {
                setOpen(false);
                inputProps?.onBlur?.(event);
              }}
              onFocus={(event) => {
                setOpen(true);
                triggerSearchOnFocus && onSearch?.(debouncedSearchTerm);
                inputProps?.onFocus?.(event);
              }}
              placeholder={
                hidePlaceholderWhenSelected && selected.length !== 0
                  ? ""
                  : placeholder
              }
              className={cn(
                "ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
                inputProps?.className
              )}
            />
          </div>
        </div>
        {open && ( //@ts-ignore
          <CommandList className="z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            {isLoading ? (
              <>{loadingIndicator}</>
            ) : (
              <>
                {EmptyItem()}
                {CreatableItem()}
                {!selectFirstItem && ( //@ts-ignore
                  <CommandItem value="-" className="hidden" />
                )}
                {Object.entries(selectables).map(([key, dropdowns]) => (
                  //@ts-ignore
                  <CommandGroup
                    key={key}
                    heading={key}
                    className="h-full overflow-auto"
                  >
                    {dropdowns.map((option) => (
                      //@ts-ignore
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disable}
                        //@ts-ignore
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          if (selected.length >= maxSelected) {
                            onMaxSelected?.(selected.length);
                            return;
                          }
                          setInputValue("");
                          const newOptions = [...selected, option];
                          setSelected(newOptions);
                          onChange?.(newOptions);
                        }}
                        className={cn(
                          "cursor-pointer",
                          option.disable &&
                            "cursor-default text-muted-foreground"
                        )}
                      >
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </>
            )}
          </CommandList>
        )}
      </Command>
    );
  }
);

MultipleSelector.displayName = "MultipleSelector";
export default MultipleSelector;
