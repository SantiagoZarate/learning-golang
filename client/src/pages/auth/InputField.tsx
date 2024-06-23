import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormType } from "@/helpers/formSchemas";
import { motion } from "framer-motion";
import { ComponentProps } from "react";
import { Control } from "react-hook-form";

interface Props extends ComponentProps<'input'> {
  description: string,
  control: Control<RegisterFormType>
  name: keyof RegisterFormType
  icon: JSX.Element
}

export function InputField(args: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
          stiffness: 100,
          bounce: 0,
          type: "spring",
        }
      }}
      exit={{ opacity: 0, scale: 0.8 }}>
      <FormField
        control={args.control}
        name={args.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 capitalize">
              {args.icon}
              {args.name}
            </FormLabel>
            <FormControl>
              <Input {...field} {...args} className="bg-input" />
            </FormControl>
            <FormDescription>
              {args.description}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  )
}
