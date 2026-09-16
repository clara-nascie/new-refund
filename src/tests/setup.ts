import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
    //remove os elementos html renderizados no teste anterior
    cleanup();
    //remove todos os itens do localStorage
    localStorage.clear();
});
