import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { type } from "os";
import { Users_address } from "./userAddress.entity";

@Entity ()
@Unique(['email_id'])
export class User extends BaseEntity {
    // save() {
    //     throw new Error("Method not implemented.");
    // }

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column ({ type: 'varchar' })
    email_id: string;

    @Exclude()
    @Column ({ type: 'varchar' })
    password: string;

    @Column ({ type: 'int' })
    age: number;

    @Column ({ type: 'varchar' })
    city: string

    @Column()
    salt: string

    @OneToOne(type => Users_address, users_address => users_address.user, {eager: true})
    address: Users_address[];


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;

    }



}