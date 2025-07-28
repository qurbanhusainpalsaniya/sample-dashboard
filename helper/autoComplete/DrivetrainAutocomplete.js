import { RHFAutocomplete } from "components/hook-form";
import { useTranslate } from "locales";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
export default function DrivetrainAutocomplete({ label = '', changeItem }) {
    const { t } = useTranslate();
    const [open, setOpen] = useState(false);
    const { control, setValue, watch } = useFormContext();

    const OPTION_LIST = [t("front_wheel_drive"), t("rear_wheel_drive"), t("all_wheel_drive"), t("four_wheel_drive"), t("two_wheel_drive")]

    return (
        <>
            <Controller
                name="drivetrain"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <RHFAutocomplete
                        freeSolo
                        openOnFocus
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        disableClearable
                        name="drivetrain"
                        label={label || t('drive_train')}
                        options={OPTION_LIST}
                        getOptionLabel={(option) => option || ""}
                        renderOption={(props, option) => (
                            <li {...props} key={option} style={{ display: "flex", gap: 8 }}>
                                {option}
                            </li>
                        )}
                        onInputChange={(event, newValue) => { changeItem(newValue); }}
                    />
                )}
            />
        </>
    );
}
