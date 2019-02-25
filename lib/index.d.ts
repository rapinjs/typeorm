export default class TypeOrmPlugin {
    afterInitRegistry({ registry, config }: {
        registry: any;
        config: any;
    }): Promise<void>;
}
