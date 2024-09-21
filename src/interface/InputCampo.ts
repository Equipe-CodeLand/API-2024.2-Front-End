export default interface InputCampo {
    label?: string;
    type: string;
    name: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    options?: string[]
    height: number;
    width: number;
}