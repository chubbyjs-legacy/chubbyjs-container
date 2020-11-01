import FactoryInterface from './FactoryInterface';

const Parameter = (value: any): FactoryInterface => {
    return (): any => {
        return value;
    };
};

export default Parameter;
