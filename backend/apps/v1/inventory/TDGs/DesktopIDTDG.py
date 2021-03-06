from backend.utils.database import Database


class DesktopIDTDG:

    owner = None

    def findBySpec(spec):

        with Database() as cursor:

            query = """
                SELECT * FROM desktopID WHERE modelNum = '{}';
            """.format(spec.modelNumber)
            try:
                cursor.execute(query)
                resultSet = cursor.fetchall()
                return resultSet
            except Exception as error:
                print(error)
                return None

    def findBySerialNumber(serialNum):

        with Database() as cursor:

            query = """
                SELECT * FROM desktopID WHERE serialNum = '{}';
            """.format(serialNum)
            try:
                cursor.execute(query)
                result = cursor.fetchone()
                return result
            except Exception as error:
                print(error)
                return None

    def insert(desktopID):

        with Database() as cursor:

            query = """
                INSERT INTO desktopID (serialNum, modelNum, isLocked)
                VALUES ('{}', '{}', 0);
            """.format(desktopID.serialNumber, desktopID.spec.modelNumber)

            try:
                cursor.execute(query)
            except Exception as error:
                print(error)

    def update(desktopID):
        with Database() as cursor:
            isLockedInt = 1 if desktopID.isLocked else 0
            query = """
                UPDATE desktopID SET
                isLocked = {}
                WHERE serialNum = '{}';
            """.format(isLockedInt, desktopID.serialNumber)

            try:
                cursor.execute(query)
            except Exception as error:
                print(error)

    def delete(serialNum):

        with Database() as cursor:

            query = """
                DELETE FROM desktopID WHERE serialNum = '{}';
            """.format(serialNum)

            try:
                cursor.execute(query)
            except Exception as error:
                print(error)

    def lock(uow):
        if DesktopIDTDG.owner is None:
            owner = uow
            return True
        else:
            return False

    def unlock(uow):
        if DesktopIDTDG.owner is uow:
            owner = None
            return True
        else:
            return False
