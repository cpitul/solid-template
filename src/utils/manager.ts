import { type User, type Role } from "@prisma/client";
import { prisma, type Prisma } from "~/server/db";

export class RoleManager {
    static async getById(id: Role["id"], options?: { select?: Prisma.RoleSelect }) {
        const role = await prisma.role.findFirst({ where: { id }, select: options?.select });

        return role;
    }

    static async getByIdOrThrow(id: Role["id"], options?: { select?: Prisma.RoleSelect }) {
        const role = await prisma.role.findFirstOrThrow({ where: { id }, select: options?.select });

        return role;
    }

    static async getByName(name: Role["name"], options?: { select?: Prisma.RoleSelect }) {
        const role = await prisma.role.findFirst({ where: { name }, select: options?.select });

        return role;
    }

    static async getByNameOrThrow(name: Role["name"], options?: { select?: Prisma.RoleSelect }) {
        const role = await prisma.role.findFirstOrThrow({ where: { name }, select: options?.select });

        return role;
    }

    static async getUserRoles(id: User["id"]): Promise<Array<Role["name"]>> {
        const roleList = await prisma.user_role.findMany({
            where: { userId: id },
            include: { role: { select: { name: true } } },
        });

        const roleNameList = Array(roleList.length) as Array<Role["name"]>;
        // eslint-disable-next-line no-restricted-syntax
        for (const userRole of roleList) {
            roleNameList.push(userRole.role.name);
        }

        return roleNameList;
    }

    static async assign(id: number, name: Role["name"]): Promise<void> {
        const role = await this.getByNameOrThrow(name, { select: { id: true } });
        const userRole = await prisma.user_role.findFirst({ where: { userId: id, roleId: role.id } });

        if (!userRole) {
            await prisma.user_role.create({ data: { userId: id, roleId: role.id } });
            console.log(`assigned user ${id} the role of ${name}`);
        }

        return void 0;
    }

    static async isAdmin(id: number): Promise<boolean> {
        const adminRole = await this.getByNameOrThrow("admin", { select: { id: true } });
        const userAdminRole = await prisma.user_role.findFirst({
            where: { userId: id, roleId: adminRole.id },
            select: {},
        });

        return Boolean(userAdminRole);
    }
}
